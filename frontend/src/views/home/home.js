import navbar from "../../components/Navbar.vue";
import {onBeforeMount, ref} from 'vue';
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
        const storage = firebase.storage();
        const storageRef = storage.ref();
        let promises = this.images.map((image) => {
            return storageRef.child(`images/${image}`).getDownloadURL()
        });
        Promise.all(promises).then((downloadURLs) => {
            const imageNames = downloadURLs.map(function (v) {
                return v.split("?alt=media")[0].split("images%2F")[1]
            });
            this.imageURLPairs = downloadURLs.reduce(function (result, field, index) {
                result[imageNames[index]] = field;
                return result;
            }, {})

        })
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
            paused:true,
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
            this.currentImagePairs = this.imagePairs.filter((
                key
            ) => !this.userAnnotations.includes(key.id));
            if (this.currentImagePairs.length === 0) {
                this.finished = true;
                return;
            }
            this.imageOne = this.imageURLPairs[this.currentImagePairs[this.index]["image_one"]];
            this.imageTwo = this.imageURLPairs[this.currentImagePairs[this.index]["image_two"]];
        },

        getUserAnnotations2() {
            const db = firebase.firestore();
            this.userAnnotations = [];
            db.collection("bears").where("user", "==", firebase.auth().currentUser.email)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        this.userAnnotations.push(doc.data().pairId)
                    });
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
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
    watch: {
        imageURLPairs: function(val) {
            console.log("Received User Annotations !");
            this.paused= false;
        }
    },
    components: {
        navbar
    },
}
