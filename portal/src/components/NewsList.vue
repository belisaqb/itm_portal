<template>
    <div>
      <ul class="list-group">
        <li v-for="news in newsList" :key="news.id" class="list-group-item">
          <div class="row d-flex justify-content-between px-2 pt-1">
            <p class="col-lg-2 col-sm-6-2 m-0">{{ news.inputNewsTitle }}</p>
            <p class="col-lg-2 col-sm-6-2 m-0">{{ news.profile }}</p>
            <p class="col-lg-2 col-sm-6-2 m-0">{{ formatDate(news.date) }}</p>
            <a class="col-lg-1 col-sm-3 m-0" @click="editNews(news)">Editar</a>
            <a class="col-lg-1 col-sm-3 m-0" @click="deleteNews(news.id)">Eliminar</a>
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
      
        this.$emit('delete-news', newsId);
      },
    },
  };
  </script>
  