<script>
    import axios from "axios";
    axios.defaults.withCredentials = true;

    let username = "";
    let password = "";
    let errorMsg = "";

    async function handleRegister() {
        console.log(username, password);
        let res = await axios.post("http://localhost:3000/users/register", {
            username: username,
            password: password,
        }); //tham so thu 2 sau URL la de them data chuyen ve

        if (res.data.code === 200) {
            res = await axios.post("http://localhost:3000/users/login",{
                    username: username,
                    password: password,
                },{},
                {
                    validateStatus: () => true,
                }
            );

            if (res.data.code === 200) {
                window.location.href = "/"; // dau / nay la trang URL hien tai cua browser
            } else {
                //case else chua chay dc
                errorMsg = res.data.message;
            }
        } else {
            //case else chua chay dc
            errorMsg = res.data.message;
        }
    }
</script>

<!-- dungf bind:value{instance} de chuyen value tu input vao instance -->
<form>
    <input bind:value={username} type="text" placeholder="Enter username" />
    <input bind:value={password} type="password" placeholder="Enter password" />
    <input on:click={handleRegister} type="submit" value="Submit" />
</form>
<h1>Registor</h1>
<p>
    Error: {errorMsg}
</p>

<style>
    input {
        display: block;
        margin: 10px 0;
        padding: 2px;
    }
</style>
