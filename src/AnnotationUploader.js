function uploadAnnotations(content, username, delete_key) {
    console.log(username);
    setUsernameToLocalStorage(username);
    console.log(content);
    console.log(delete_key);

    let currentDate = new Date();
    const year = currentDate.getFullYear(); // 年
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 月
    const day = String(currentDate.getDate()).padStart(2, '0'); // 日
    const hours = String(currentDate.getHours()).padStart(2, '0'); // 時（0埋め）
    const minutes = String(currentDate.getMinutes()).padStart(2, '0'); // 分（0埋め）
    const formattedDate = `${year}/${month}/${day} ${hours}:${minutes}`;

    //ローカルストレージのアノテーションを実際のJSONに組み込めるように値を調整
    for (let item of content.items) {
        //<p>タグ削除とタイムスタンプ、氏名の付与
        item.body.value = item.body.value.replace(/<p[^>]*>|<\/p>/g, "");
        item.body.value = "<p>" + formattedDate + "  " + username + "</p>" + item.body.value;
    }


    fetch("https://www.sugilab.net/mori.hiroyuki.lab/sotuken/manifests/uploadAnnotation.php", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content)
    })
        .then(response => response.json())
        .then(res => {
            window.alert(res.split('\\n').join('\n'));
        });
}

export function validateInputFields(content) {
    const username = document.getElementById("username").value;
    const delete_key = document.getElementById("delete-key").value;
    if (username == "" && delete_key == "") {
        window.alert("名前と削除キーを入力してください");
    } else if (username == "") {
        window.alert("名前を入力してください")
    } else if (delete_key == "") {
        window.alert("削除キーを入力してください")
    } else {
        uploadAnnotations(content, username, delete_key);
    }
}

function getUsernameFromLocalstorage() {
    const username = localStorage.getItem("username");
    console.log(username);
    return username;
}

function setUsernameToLocalStorage(username) {
    localStorage.setItem("username", username);
}

export function setUsernameToTextBox() {
    const username = getUsernameFromLocalstorage();
    const usernameTextbox = document.getElementById("username");
    usernameTextbox.value = username;
}