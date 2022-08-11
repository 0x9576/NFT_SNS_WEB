import React, { useState } from 'react'
import Axios from 'axios'
import Auth from '../../../hoc/auth';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Dropzone from 'react-dropzone';
import SHA256, { encodeBase64 } from '../../../utils/SHA256';

function UploadPage() {
    let naviate = useNavigate();
    let formData = new FormData;
    const [filePath, setFilePath] = useState("")
    const [description, setDescription] = useState("");
    const [fileHash, setFileHash] = useState("");

    let accountAddress = useSelector(state => state.account.account);
    if (accountAddress)
        accountAddress = accountAddress.account;
    else
        accountAddress = "";

    const onDrop = (files) => {
        console.log(files);
        formData.append("file", files[0]);

        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }

        //upload request
        Axios.post('/api/feed/uploadPhoto', formData, config)
            .then(response => {
                //미리보기 생성을 위해 사진을 저장 후 보여준다
                console.log(response);
                if (response.data.success) {
                    setFilePath(response.data.url);
                    encodeBase64('http://localhost:2400/' + filePath)
                        .then(data => {
                            const base64 = data;
                            setFileHash(SHA256(base64));
                        })
                    console.log(fileHash);
                }
                else {
                    alert('사진 업로드 실패');
                }
            })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const variables = {
            writer: accountAddress,
            description: description,
            filePath: filePath,
            contractAddress: "",
            tokenNum: "",
        }
        Axios.post('/api/feed/uploadFeed', variables)
            .then(response => {
                if (response.data.success) {
                    alert('업로드 성공');
                    //0.5초뒤 feed로 이동
                    setTimeout(() => {
                        naviate('/');
                    }, 0.5);
                } else {
                    alert('업로드 실패');
                }
            })
    }

    return (
        <div>
            <Header />
            <h2>업로드 페이지</h2>
            <Dropzone
                onDrop={onDrop}
                multiple={false} //다중파일여부
                maxSize={100000000000000}>
                {({ getRootProps, getInputProps }) => (
                    <div style={{
                        width: '600px', height: '400px', border: '1px solid lightgray', display: 'flex',
                        alignItems: 'center', justifyContent: 'center'
                    }} {...getRootProps()}>
                        <input {...getInputProps()} />
                        {filePath ?
                            //path에 뭔가 있을 때만 미리보기 생성.
                            <div>
                                <img id="preview" src={`http://localhost:2400/${filePath}`} alt="preview" />
                            </div> :
                            <div>사진을 여기에 끌어다 주세요</div>
                        }
                    </div>
                )}
            </Dropzone>

            <div>설명</div>
            <textarea id="textarea" rows="4" cols="78" onChange={e => setDescription(e.target.value)} />
            <button onClick={onSubmit}>게시글 등록하기</button>
            <Footer />
        </div>
    )
}

export default Auth(UploadPage, true);