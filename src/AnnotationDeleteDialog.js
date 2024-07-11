export function makeDeleteAnnotationDialog(annotationid, annotation_content) {
    const body = $(".modal-area");

    body.html(`
    <div id="delete-dialog" class="modal-container6">
        <div class="modal-body6">
            <img class="modal-close6" src="./img/close-btn.png" alt="close-button">
            <div class="modal-content6">
                <h3 class="modal5-title">アノテーションの削除（サーバ上）</h3>
                <div class="written-content-area">
                    <label for="written-annotation">アノテーション：</label><br>
                    <p class="written-annotation written-content confirm-del-annotation" name="written-annotation">${annotation_content}</p>
                </div>
                <div class="cp_iptxt">
                    <label class="confirm-delkey-write-area" for="tag-write-area">削除キー<div class="asterisk">* </div>：</label><br>
                    <label class="ef">
                    <input id="confirm-delkey-write-area" class="write-area" type="text" name="tag-write-area" value="${localStorage.getItem("delete_key") != null ? localStorage.getItem("delete_key") : ""}" placeholder="削除キーを入力してください" />
                    </label >
                </div >
                <button id="delete-annotation-btn" class="delete-annotation-btn2" type="button">削除</button>
           </div>
        </div> 
    </div>
    `);

    //when click close btn
    const close = $(".modal-close6");
    close.on('click', function () {
        body.empty();
    });

    const deleteAnnotationBtn = $("#delete-annotation-btn");
    deleteAnnotationBtn.on('click', function () {
        const delete_key = document.getElementById("confirm-delkey-write-area").value;
        const send_data = { id: annotationid, delkey: delete_key };
        if (delete_key == "") {
            window.alert("削除キーを入力してください");
        } else {
            fetch("https://www.sugilab.net/mori.hiroyuki.lab/sotuken/manifests/deleteAnnotation.php", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(send_data)
            })
                .then(response => response.json())
                .then(res => {
                    window.alert(res.split('\\n').join('\n'));
                    location.reload();
                });
        }
    })
}

export function makeDeleteLocalAnnotationDialog(canvases, storageAdapter, annotationid, receiveAnnotation, annotation_content) {
    const body = $(".modal-area");

    body.html(`
    <div id="delete-dialog" class="modal-container6">
        <div class="modal-body6 delete-local">
            <img class="modal-close6" src="./img/close-btn.png" alt="close-button">
            <div class="modal-content6">
                <h3 class="modal5-title">アノテーションの削除（ローカル）</h3>
                <div class="written-content-area">
                    <label for="written-annotation">アノテーション：</label><br>
                    <p class="written-annotation written-content confirm-del-annotation" name="written-annotation">${annotation_content}</p>
                </div>
                <button id="delete-annotation-btn" class="delete-annotation-btn2 delete-local-annotation-btn" type="button">削除</button>
           </div>
        </div> 
    </div>
    `);

    //when click close btn
    const close = $(".modal-close6");
    close.on('click', function () {
        body.empty();
    });

    const deleteAnnotationBtn = $("#delete-annotation-btn");
    deleteAnnotationBtn.on('click', function () {
        canvases.forEach(function (canvas) {
            var adapter = storageAdapter(canvas.id);
            adapter["delete"](annotationid).then(function (annoPage) {
                receiveAnnotation(canvas.id, adapter.annotationPageId, annoPage);
            });
        })

        const container = $(".modal-container6");
        container.addClass("not-show")
    })
}