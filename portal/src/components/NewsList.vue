<template>
    <div>
      <ul class="list-group">
        <li v-for="news in newsList" :key="news.id" class="list-group-item">
          <div class="row d-flex justify-content-between px-2 py-1">
            <p class="col-lg-2 col-sm-6-2 m-0">{{ news.inputNewsTitle }}</p>
            <p class="col-lg-2 col-sm-6-2 m-0">{{ news.profile }}</p>
            <p class="col-lg-2 col-sm-6-2 m-0">{{ formatDate(news.date) }}</p>
            <a class="col-lg-1 col-sm-3 m-0" @click="editNews(news)"><img class="w-25" src="../assets/svg/edit.svg" alt=""></a>
            <a class="col-lg-1 col-sm-3 m-0" @click="deleteNews(news.id)"><img class="w-25" src="../assets/svg/delete.svg" alt=""></a>
          </div>
        </li>
      </ul>
    </div>
  </template>
  <script>
  
  import { format } from 'date-fns';

  export default {
    props: {
      newsList: Array,
    },
    methods: {
      formatDate(date) {
        return format(date.toDate(), 'dd/MM/yyyy'); 
      },
      editNews(news) {
        this.$emit('edit-news', news);
      },
      deleteNews(newsId) {
      
        this.$emit('delete-news', newsId, 'news');
      },
    },
  };
  </script>

<style scoped>
.list-group-item{
  text-decoration: none;
  color: rgba(0, 45, 92, 1);
  background-color: rgba(0, 167, 126, 1);
  border: 0.1rem solid rgba(0, 196, 151, 1);
  border-top-right-radius: 0rem !important;
  border-top-left-radius: 0rem !important;
}
</style>
  