import navbar from "../../components/Navbar.vue";
import {ref, onBeforeMount, onMounted} from 'vue';
import firebase from 'firebase';
import imagePairs from './image_pairs.js';
import images from './images.js';


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

    mounted() {

        this.getUserAnnotations2();
        console.log("mounted value of images is" + this.images);
        const storage = firebase.storage();
        const storageRef = storage.ref();
        // do this on mounted then store the list on client and pick from there? so only 1 request
        let promises = this.images.map((image) => {
            console.log("image", image);
            // return [image["id"], storageRef.child(`images/${image["image_one"]}`).getDownloadURL(), storageRef.child(`images/${image["image_two"]}`).getDownloadURL()];
            return storageRef.child(`images/${image}`).getDownloadURL()
        });
        Promise.all(promises).then((downloadURLs) => {
            console.log("download", downloadURLs);
            // this.downloadURLs = downloadURLs;
            // this.image_one=downloadURLs[this.index]
            // this.image_two=downloadURLs[this.index+1]
            const imageNames = downloadURLs.map(function (v) {
                return v.split("?alt=media")[0].split("images%2F")[1]
            });
            const imageURLPairs = downloadURLs.reduce(function (result, field, index) {
                result[imageNames[index]] = field;
                return result;
            }, {})
            this.imageURLPairs = imageURLPairs
            console.log(imageURLPairs);

        });


    },


    data: function () {
        return {
            decision: false,
            finished: false,
            confidence: 15,
            imageOne: "",
            imageTwo: "",
            images: images,
            imagePairs: imagePairs,
            imageURLPairs: {},
            started: false,
            index: 0,
            // bear_name: "",
            downloadURLs: [],
            currentPairId: 0,
            userAnnotations: [],
            currentImagePairs: [],
        };
    },

    methods: {


        nextImage() {
            this.createUserAnnotation(this.currentImagePairs[this.index]["id"], this.confidence, this.decision, [this.currentImagePairs[this.index]["image_one"], this.currentImagePairs[this.index]["image_two"]]);
            this.index += 1

            if (this.currentImagePairs.length === this.index) {
                this.finished = true;
                return;
            }

            this.confidence = 15;
            this.decision = false;
            this.imageOne = this.imageURLPairs[this.currentImagePairs[this.index]["image_one"]];
            this.imageTwo = this.imageURLPairs[this.currentImagePairs[this.index]["image_two"]];

            // this.bear_name = "";
        },

        startExperiment() {
            this.started = true;
            console.log("start", this.userAnnotations);
            console.log("startpairs", this.imagePairs);
            this.currentImagePairs = this.imagePairs.filter((
                key
            ) => !this.userAnnotations.includes(key.id));
            if (this.currentImagePairs.length === 0) {
                this.finished = true;
                return;
            }
            console.log(this.currentImagePairs);
            this.imageOne = this.imageURLPairs[this.currentImagePairs[this.index]["image_one"]];
            this.imageTwo = this.imageURLPairs[this.currentImagePairs[this.index]["image_two"]];
        },

        getUserAnnotations2() {
            const db = firebase.firestore();
            this.userAnnotations = [];
            // const o = []
            db.collection("bears").where("user", "==", firebase.auth().currentUser.email)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        // this.userAnnotations.push({
                        //     id: doc.id,
                        //     user: doc.data().user,
                        //     pair_id: doc.data().pair_id,
                        // });
                        this.userAnnotations.push(doc.data().pairId)
                        console.log(doc.id, " => ", doc.data());
                    });
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
        },

        getUserAnnotations() {
            const db = firebase.firestore();
            this.userAnnotations = [];
            db.collection("bears")
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        // this.userAnnotations.push({
                        //     id: doc.id,
                        //     user: doc.data().user,
                        //     pairId: doc.data().pairId,
                        // });
                        this.userAnnotations.push(doc.data().pairId)
                        console.log(doc.id, " => ", doc.data());
                    });
                })
                .catch((error) => {
                    console.log("Error getting user annotations: ", error);
                });
            return this.userAnnotations
        },

        createUserAnnotation(pairId, confidence, decision, imagePair) {
            const db = firebase.firestore();
            const user = firebase.auth().currentUser.email
            db.collection("bears")
                .doc(user + "_" + pairId.toString())
                .set({
                    user: user,
                    pairId: pairId,
                    confidence: confidence,
                    decision: decision,
                    imagePair: imagePair,
                    date: new Date()
                })
                .then(() => {
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
        },

    },
    computed: {},
    components: {
        navbar
    },
}
