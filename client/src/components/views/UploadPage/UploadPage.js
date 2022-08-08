import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import Auth from '../../../hoc/auth';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Dropzone from 'react-dropzone';

function UploadPage() {
    let naviate = useNavigate();
    let formData = new FormData;
    const [filePath, setFilePath] = useState("")

    const onDrop = (files) => {
        console.log(files);
        formData.append("file", files[0]);

        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }

        //upload request
        Axios.post('/api/photo/uploads', formData, config)
            .then(response => {
                //미리보기 생성을 위해 사진을 저장 후 보여준다
                console.log(response);
                if (response.data.success) {
                    setFilePath(response.data.url);
                }
                else {
                    alert('사진 업로드 실패');
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
                maxSize={10000000000000000}>
                {({ getRootProps, getInputProps }) => (
                    <div style={{
                        width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex',
                        alignItems: 'center', justifyContent: 'center'
                    }} {...getRootProps()}>
                        <input {...getInputProps()} />4
                    </div>
                )}
            </Dropzone>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default Auth(UploadPage, true);