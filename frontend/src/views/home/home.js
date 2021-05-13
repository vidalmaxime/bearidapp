import navbar from "../../components/Navbar.vue";
import {ref, onBeforeMount} from 'vue';
import firebase from 'firebase';


export default {
    name: 'home',
    setup() {

        const name = ref("");
        onBeforeMount(() => {
            const user = firebase.auth().currentUser;
            console.log(user);
            if (user) {
                name.value = user.email.split("@")[0];
            }

            // var storage    = firebase.storage();
            // var storageRef = storage.ref();
            // var listRef = storageRef.child('images/');
            //
            // // Find all the prefixes and items.
            // listRef.listAll()
            //     .then((res) => {
            //         res.items.forEach((itemRef) => {
            //             console.log(itemRef.getDownloadURL());
            //             console.log("itemref", itemRef);
            //             // All the items under listRef.
            //         });
            //     }).catch((error) => {
            //     // Uh-oh, an error occurred!
            // });


        });


        const Logout = () => {
            firebase
                .auth()
                .signOut()
                .then(() => console.log("Signed out"))
                .catch(err => alert(err.message));
        }

        return {
            name,
            Logout
        }
    },

    // beforeMount() {
    //         var storage = firebase.storage();
    //         var storageRef = storage.ref();
    //         let promises = this.images.map((image, i) => {
    //             console.log("image",image);
    //             return storageRef.child(`images/${image}`).getDownloadURL();
    //         });
    //         Promise.all(promises).then((downloadURLs) => {
    //             console.log("download",downloadURLs);
    //             this.image_one=downloadURLs[0]
    //         });
    //
    //
    // },

    data: function () {
        return {
            value: 15,
            image_one: "",
            image_two:"",
            images: ["598A0068_Rocky.JPG", "598A0078_Holden.JPG", "598A0080_Fisher.JPG", "598A0093_Waterfalls.JPG", "598A0157_Aardvark.JPG", "598A0171_Panda.JPG"],
            started: false,
            index:2,
            bear_name: "",
        };
    },

    methods: {
        // mounted() {
        //     var storage = firebase.storage();
        //     var storageRef = storage.ref();
        //     var listRef = storageRef.child('images/');
        //     storageRef.child('images/'+this.images[0]).getDownloadURL().then(function (url) {
        //         var image_one = url;
        //         console.log("imageone", image_one);
        //         this.image_one = image_one;
        //         document.getElementById("imagepairone").src = string(image_one);
        //     }).catch(function (error) {
        //     });
        //     storageRef.child('images/'+this.images[1]).getDownloadURL().then(function (url) {
        //         var image_two = url;
        //         console.log("imagetwo", image_two);
        //         this.image_two = image_two;
        //     }).catch(function (error) {
        //     });
        //     console.log("MOUNTED");
        //
        // },

        nextImage() {
            // var storage = firebase.storage();
            // var storageRef = storage.ref();
            // console.log(this.image_one)
            // var listRef = storageRef.child('images/');
            // storageRef.child('images/'+this.images[0]).getDownloadURL().then(function (url) {
            //     var image_one = url;
            //     this.image_one = url; //image_one;
            //     console.log("imageone", this.image_one);
            //     document.getElementById("imagepairone").src = image_one;
            // }).catch(function (error) {
            // });
            // storageRef.child('images/'+this.images[1]).getDownloadURL().then(function (url) {
            //     var image_two = url;
            //     console.log("imagetwo", image_two);
            //     this.image_two = image_two;
            // }).catch(function (error) {
            // });

            var storage = firebase.storage();
            var storageRef = storage.ref();
            // do this on mounted then store the list on client and pick from there? so only 1 request
            let promises = this.images.map((image, i) => {
                console.log("image",image);
                return storageRef.child(`images/${image}`).getDownloadURL();
            });
            Promise.all(promises).then((downloadURLs) => {
                console.log("download",downloadURLs);
                this.image_one=downloadURLs[this.index]
                this.image_two=downloadURLs[this.index+1]
            });
            this.index += 2;
            this.value = 15;
            this.bear_name = "";

        },

        startExperiment() {
            this.started=true;
            var storage = firebase.storage();
            var storageRef = storage.ref();
            let promises = this.images.map((image, i) => {
                console.log("image",image);
                return storageRef.child(`images/${image}`).getDownloadURL();
            });
            Promise.all(promises).then((downloadURLs) => {
                console.log("download",downloadURLs);
                this.image_one=downloadURLs[0]
                this.image_two=downloadURLs[1]
            });
        }

    },
    computed: {},
    components: {
        navbar
    },
}
