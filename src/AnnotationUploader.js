export function uploadAnnotations(content) {
    console.log(content);

    //ローカルストレージのアノテーションを実際のJSONに組み込めるように値を調整
    for (let item of content.items) {

        //<p>タグ削除とタイムスタンプ、氏名の付与
        let currentDate = new Date();
        const year = currentDate.getFullYear(); // 年
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 月
        const day = String(currentDate.getDate()).padStart(2, '0'); // 日
        const hours = String(currentDate.getHours()).padStart(2, '0'); // 時（0埋め）
        const minutes = String(currentDate.getMinutes()).padStart(2, '0'); // 分（0埋め）
        const formattedDate = `${year}/${month}/${day} ${hours}:${minutes}`;

        item.body.value = item.body.value.replace(/<p[^>]*>|<\/p>/g, "");
        item.body.value = "<p>" + formattedDate + "  mori</p>" + item.body.value;

        //y座標がずれる不具合の修正
        const [, xStr, yStr, wStr, hStr] = item.target.selector[0].value.match(/xywh=(\d+),(\d+),(\d+),(\d+)/) || [];
        const y = parseInt(yStr, 10);
        const newY = y + 180;
        item.target.selector[0].value = item.target.selector[0].value.replace(/xywh=(\d+),(\d+),(\d+),(\d+)/, `xywh=${xStr},${newY},${wStr},${hStr}`);
    }


    fetch("https://www.sugilab.net/mori.hiroyuki.lab/sotuken/manifests/test.php", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content)
    })
        .then(response => response.json())
        .then(res => {
            window.alert(res);
        });
}

export function isUsernameInputed() {
    const username = document.getElementById("username").value;
    if (username == ""){
        window.alert("input your name");
    }else{
        window.alert(username);
    }
}