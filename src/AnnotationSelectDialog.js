import { validateInputFields } from "./AnnotationUploader";

export async function makeAnnotationSelecetDialog(canvases, config) {
    console.log(canvases);
    console.log(config);
    const store = config.annotation.adapter(canvases[0].id);
    const content = await store.all();
    console.log(store);
    console.log(content);

    const body = $(".modal-area");
    body.html(`
        <div id="delete-dialog" class="modal-container6">
            <div class="modal-body4">
                <img class="modal-close6" src="./img/close-btn.png" alt="close-button">
                <div class="modal-content6">
                    <h3 class="modal5-title">アノテーションの選択</h3>
                    <div class="content-area">
                        <div id="annotation-area" class="annotation-area"></div>
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
                            <button id="post-annotation-btn" class="delete-annotation-btn2" type="button" onclick="">投稿</button>
                        </div>
                    </div>
               </div>
            </div> 
        </div>
        `);

    const annotation_area = document.getElementById("annotation-area");
    annotation_area.innerHTML = "";
    for (let annotation of content["items"]) {
        annotation_area.innerHTML += `
                <div class="annotation-block">
                    <input type="checkbox"/>
                    <p id="${annotation.id}">${annotation.body.value.replace(/<p[^>]*>|<\/p>/g, "")}</p>
                </div>
                `;
    }

    //when click close btn
    const close = $(".modal-close6");
    close.on('click', function () {
        body.empty();
    });
}