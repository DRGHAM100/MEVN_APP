<template>
    <v-container>
        <v-row no-gutters>
        <v-col sm="10" class="pa-4 mx-auto">
            <v-card class="pa-2">
                <v-img height="250" :src="`/${post.image}`" ></v-img>
                <v-card-actions class="pb-0">
                    <v-row class="mt-1 mx-1">
                        <v-col sm="2">
                            <v-btn small outlined color="primary">
                            {{ post.categore }}
                            </v-btn>
                        </v-col>
                        <v-col sm="10" class="d-flex justify-end">
                            <v-btn color="success" :to="{name: 'edit-post',params:{id: post._id } }" text>Edit</v-btn>
                            <v-btn color="red" @click="delPost" text>Delete</v-btn>
                        </v-col>
                    </v-row>
                </v-card-actions>
                <v-card-subtitle class="headline">
                    <h3>{{ post.title }}</h3>
                </v-card-subtitle>
                <v-card-text class="grey--text">
                    <p>{{ post.content}}</p>
                    <p>{{ new Date(post.created)}}</p>
                </v-card-text>
            </v-card>
        </v-col>
        </v-row>
  </v-container>
</template>
<script>
import API from '../api'; 
  export default {
    name: 'Post',
    data(){
        return{
            post: []
        };
    },
    async created(){
        const response = await API.getPostByID(this.$route.params.id);
        this.post = response;
    },
    methods:{
        async delPost(){
            // alert(this.$route.params.id);
            const response = await API.deletePost(this.$route.params.id);
            this.$router.push({ name: "home",params: { message: response.message } });
        }
    }
  } 
</script>