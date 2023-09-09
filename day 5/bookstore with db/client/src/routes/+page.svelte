<script>
    import { onMount } from "svelte";
    import axios from "axios";
    // import '.style.css' //vi du
    let books = [];

    async function fetchBooks() {
        //ham axious return ve 1 response nen no bat dong bo
        let res = await axios.get("http://localhost:3000/books"); //tuong tu nhu ben postman
        books = res.data.data
        console.log(res);
    }

    onMount(() => {
        fetchBooks();
    });
</script>

<h1>Home page</h1>
<div class="book-container">
    {#each books as book}
        <div class="book-item">
            <p>{book.title}</p> by <p class="book-author">{book.author}</p>
            <hr>
            <img src="http://localhost:3000/{book.thumbnailImage}" alt=""/>
        </div>
    {/each}
</div>

<!-- them lang="scss" vo cho style de chuyen qua syntax scss -->
<style>
    p {
        display: inline;
    }
    .book-item {
        border: 1px solid black;
        margin: 5px;
        padding: 5px;
        width: 300px;
        border-radius: 5%;
    }
    .book-author {
        color: red;
    }
    .book-item img {
        width: 100px;
        border-radius: 5px;
    }
    .book-container{
        display: flex;
        /* xai grid cho viec chia bao nhieu item 1 row */
    }
</style>
