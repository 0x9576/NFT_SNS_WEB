import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Auth from '../../../hoc/auth';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import Dropzone from 'react-dropzone';
import SHA256, { encodeBase64 } from '../../../utils/SHA256';
import { SNSTokenAddress, SNSTokenContract } from '../../../contracts';
import GoogleMap from 'google-map-react';
import { GoogleMapAPI_Key } from '../../../utils/API_Key';
import { getLocation, getLocationInfo } from '../../../utils/getLocation';

function UploadPage() {
    let naviate = useNavigate();
    let formData = new FormData;
    const [filePath, setFilePath] = useState("")
    const [description, setDescription] = useState("");
    const [fileHash, setFileHash] = useState(""); //Image file => Base64 => HashValue(SHA256)
    const [latitude, setLatitude] = useState(37.5);
    const [longitude, setLongitude] = useState(127);
    const [locationInfo, setLocationInfo] = useState("");
    const [locationShared, setLocationShared] = useState(true);

    let accountAddress = useSelector(state => state.account.account);
    if (accountAddress) {
        accountAddress = accountAddress.account;
    }
    else {
        accountAddress = "";
    }

    useEffect(() => {
        getLocation().then(result => (
            setLatitude(result.latitude)
            , setLongitude(result.longitude)))
    }, [])

    useEffect(() => {
        if (latitude == 37.5 && longitude == 127) return;
        getLocationInfo(latitude, longitude).then(result => setLocationInfo(result))
    }, [latitude, longitude])


    const onDrop = (files) => {
        formData.append("file", files[0]);
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }

        //upload request
        Axios.post('/api/feed/uploadPhoto', formData, config)
            .then(response => {
                //미리보기 생성을 위해 사진을 저장 후 보여준다
                if (response.data.success) {
                    setFilePath(response.data.url);
                    encodeBase64(files[0]).then(function (result) {
                        const base64String = result;
                        setFileHash(SHA256(base64String));
                    })
                }
                else {
                    console.log(response);
                    alert('사진 업로드 실패');
                }
            })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        document.getElementById("preview");
        let tokenNum = "1";
        try {
            await SNSTokenContract.methods
                .mintSNSToken(fileHash)
                .send({ from: accountAddress });
            tokenNum = await SNSTokenContract.methods
                .totalSupply()
                .call();
            console.log(tokenNum);
        } catch (error) {
            console.log(error);
            alert('업로드 실패: 트랜잭션 오류');
            return;
        }
        if (!locationShared) {
            setLatitude(-1);
            setLongitude(-1);
            setLocationInfo("");
        }
        const variables = {
            writer: accountAddress,
            description: description,
            filePath: filePath,
            contractAddress: SNSTokenAddress,
            tokenNum: String(tokenNum),
            latitude: latitude,
            longitude: longitude,
            locationInfo: locationInfo
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
                    alert('업로드 실패 DB오류');
                }
            })
    }

    return (
        <div>
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
            <textarea id="textarea" rows="4" cols="78" onChange={e => setDescription(e.target.value)} />
            <div style={{ height: '200px', width: '300px' }}>
                <GoogleMap
                    bootstrapURLKeys={{ key: GoogleMapAPI_Key }}
                    defaultZoom={17}
                    center={{ lat: latitude, lng: longitude }} //현재 위치로 center가 바뀜.
                />
            </div>
            <h4>{locationInfo}</h4>
            <div style={{ marginBottom: '20px' }}>위치정보 공유
                <input type="checkbox" checked={locationShared} onChange={e => setLocationShared(!locationShared)} />
            </div>
            <button onClick={onSubmit}>게시글 등록하기</button>
        </div>
    )
}

export default Auth(UploadPage, true);