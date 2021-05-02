import axios from 'axios'
export default {
    name: 'inference',
    data: function() {
        return {
            filelist: [],
            empty: true,
            novideo: true,
        };
    },
    methods: {
        onChange: function() {
            this.filelist = [...this.$refs.file.files];
        },
        remove: function(i) {
            console.log(this.filelist);
            this.filelist.splice(i, 1);
        },
        dragover: function(event) {
            event.preventDefault();
            if (!event.currentTarget.classList.contains('bg-blue-200')) {
                event.currentTarget.classList.remove('bg-gray-100');
                event.currentTarget.classList.add('bg-blue-200');
            }
        },
        dragleave: function(event) {
            event.currentTarget.classList.add('bg-gray-100');
            event.currentTarget.classList.remove('bg-blue-200');
        },
        drop: function(event) {
            event.preventDefault();
            this.$refs.file.files = event.dataTransfer.files;
            this.onChange();
            event.currentTarget.classList.add('bg-gray-100');
            event.currentTarget.classList.remove('bg-blue-200');
            this.empty = false
            let formData = new FormData();

            formData.append(this.$route.params.bear.toString(), this.filelist[0]); // can also get list of files to backend later
            // for (var pair of formData.entries()) {
            //     console.log(pair[0]+ ', ' + pair[1]);
            // }
            // console.log(formData.get("video"));
            axios.post("http://localhost:5000/predict", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
                .then(response => {
                    this.novideo = false;
                    console.log(response);
                    var video = document.createElement('video');
                    document.body.appendChild(video);
                    var src = window.URL.createObjectURL(new Blob([response.data]));
                    this.addSourceToVideo(video, src, 'video/mp4');
                    video.play();
                })
        },
        addSourceToVideo(element, src, type) {
            var source = document.createElement('source');
            source.src = src;
            source.type = type;
            element.appendChild(source);
        }

}
}
