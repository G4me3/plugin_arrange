import { validateInputFields } from "./AnnotationUploader";

let checkboxes = "";
let uncheckboxes = "";
let unselected_annotations_id = "";

export async function makeAnnotationSelecetDialog(canvases, config, e) {
    e.stopPropagation();
    console.log(canvases);
    console.log(config);
    const store = config.annotation.adapter(canvases[0].id);
    const content = await store.all();
    console.log(store);
    console.log(content);
    const body = $(".modal-area");

    if (content == null) {
        body.html(`
        <div id="delete-dialog" class="modal-container6">
            <div class="modal-body4">
                <img class ="modal-close6 modal-close6a" src="./img/close-btn.png" alt="close-button">
                <div class ="modal-content6a">
                    <h3 class ="modal5-title">アノテーションの選択</h3>
                    <p class = "no-content-description">アップロードできるアノテーションがありません</p>
               </div>
            </div> 
        </div>
        `);
    } else {
        body.html(`
        <div id="delete-dialog" class="modal-container6">
            <div class="modal-body4">
                <img class="modal-close6" src="./img/close-btn.png" alt="close-button">
                <div id="modal-content6"  class="modal-content6">
                    <h3 class="modal5-title">アノテーションの選択</h3>
                    <div class="content-area">
                        <div id="annotation-area" class="annotation-area"></div>
                        <div class="input-area">
                            <button id="post-annotation-btn" class="delete-annotation-btn2" type="button">投稿</button>
                        </div>
                    </div>
                <div id="upload-confirm-dialog"></div>
               </div>
            </div> 
        </div>
        `);

        const annotation_area = document.getElementById("annotation-area");
        annotation_area.innerHTML = "";
        for (let annotation of content["items"]) {
            annotation_area.innerHTML += `
                <div class="annotation-block">
                    <label>
                        <input type="checkbox" name="annotation" value="${annotation.id}">
                        ${annotation.body.value.replace(/<p[^>]*>|<\/p>/g, "")}
                    </label>
                </div>
                `;

        }

        const post_btn = $("#post-annotation-btn");
        post_btn.on("click", function () {
            checkboxes = document.querySelectorAll("input[name='annotation']:checked");
            if (checkboxes.length == 0) {
                window.alert("アノテーションを選択してください");
                checkboxes = "";
            } else {
                uncheckboxes = document.querySelectorAll("input[name='annotation']:not(:checked)");
                unselected_annotations_id = Array.from(uncheckboxes).map(uncheckbox => uncheckbox.value);
                for (let annotationid of unselected_annotations_id) {
                    content.items = content.items.filter(contentitem => contentitem.id !== annotationid);
                }
                console.log(content);
                makeUploadConfirmDialog(content);
            }
        });
    }

    //when click close btn
    const close = $(".modal-close6");
    close.on('click', function () {
        body.empty();
    });
}

function makeUploadConfirmDialog(content) {

    const upload_confirm_dialog = document.getElementById("upload-confirm-dialog");
    upload_confirm_dialog.innerHTML += `
    <div id="delete-dialog" class="modal-container6b">
        <div class="modal-body4b">
            <img class="modal-close6b" src="./img/close-btn.png" alt="close-button">
            <div id="modal-content6b"  class="modal-content6b">
                <h3 class="modal5-title">アップロード内容の確認</h3>
                <div class="content-area">
                    <div id="annotation-area2" class="annotation-area"></div>
                    <div class="input-area">
                        <div class="cp_iptxt cp_iptxt2">
                            <label for ='username-select' class='label-username-select'>名前<div class="asterisk">* </div>：</label><br></br>
                            <label class="ef">
                            <input id="username-select" class="input-box" type="text" placeholder="名前を入力してください" value="${localStorage.getItem("username") != null ? localStorage.getItem("username") : ""}" name='username-select'/>
                            </label>
                        </div>
                        <div class="cp_iptxt del-area cp_iptxt2">
                            <label class="label-delkey-select" for="delkey-select">削除キー<div class="asterisk">* </div>：</label><br>
                            <label class="ef">
                            <input id="delete-key-select" class="input-box" type="text" name="delkey-select" value="${localStorage.getItem("delete_key") != null ? localStorage.getItem("delete_key") : ""}" placeholder="削除キーを入力してください" />
                            </label >
                        </div>
                        <button id="post-annotation-btn2" class="delete-annotation-btn2" type="button">投稿</button>
                    </div>
                </div>
            </div>
        </div> 
    </div>`;

    const annotation_area = document.getElementById("annotation-area2");
    annotation_area.innerHTML = "";
    for (let annotation of content["items"]) {
        annotation_area.innerHTML += `
            <div class="annotation-block">
                <li class="selected-annotation">${annotation.body.value.replace(/<p[^>]*>|<\/p>/g, "")}</li>
            </div>
            `;
    }

    //when click close btn
    const close = $(".modal-close6b");
    close.on('click', function () {
        const upload_confirm_dialog = $("#upload-confirm-dialog");
        checkboxes = "";
        uncheckboxes = "";
        unselected_annotations_id = "";
        upload_confirm_dialog.empty();
    });

    const post_btn = $("#post-annotation-btn2");
    post_btn.on("click", function () {
        validateInputFields(content);
    })
}