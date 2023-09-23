<template>
    <div>
        <h1>Upload img</h1>
        <form @submit.prevent="uploadImage" enctype="multipart/form-data">
            <input @change="clickImage($event)" type="file" accept="image/*">
            <input type="submit" name="" id="" value="Upload Image">
        </form>
    </div>
</template>

<script>
// import { ref } from 'vue'
import { ref } from "firebase/storage";
import { storage, uploadBytes } from '@/firebase'

export default {
    data() {
        return {
            images: [],
            image: null
        }
    },
    methods: {
        clickImage(e) {
            this.image = e.target.files[0]
            console.log(this.image)
        },
        uploadImage() {
            //create the reference where to
            // console.log(ref(storage, 'images/' + this.image.name))
            const storageRef = ref(storage, 'images/' + this.image.name)
            // const refImg = storageRef(storage, 'images/' + this.image.name)
            const metadata = {
                contentType: 'image/jpeg',
            }

            const uploadTask = uploadBytes(storageRef, this.image, metadata);

            console.log(uploadTask)

            // refImg.put(this.image, metadata)
            // .then((e) => {
            //     console.log(e)
            // }).catch((err) => {
            //     console.log(err.message)
            // });
            // console.log(refImg)
        }
    }
}
</script>