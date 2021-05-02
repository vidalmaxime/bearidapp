import navbar from "../../components/Navbar.vue";
import { ref, onBeforeMount } from 'vue';
import firebase from 'firebase';
export default {
    name: 'home',
    setup () {

        const name = ref("");
        onBeforeMount(()=> {
            const user = firebase.auth().currentUser;
            console.log(user);
            if (user) {
                name.value= user.email.split("@")[0];
            }
        });

        const Logout = () => {
            firebase
                .auth()
                .signOut()
                .then(() => console.log("Signed out"))
                .catch(err=> alert(err.message));
        }

        return {
            name,
            Logout
        }
    },
    data: function () {
        return {
            confidence:15,
        };
    },
    methods: {

    },
    computed: {
    },
    components: {
        navbar
    },
}
