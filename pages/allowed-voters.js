import React ,{useState,useEffect,useCallback,useContext} from 'react'
import { useRouter } from 'next/router';
import {useDropzone} from 'react-dropzone';
import Image from 'next/image';

//Internal Import
import {VotingContext} from '../context/Voter';
import Style from '../styles/allowedVoter.module.css';
import images from '../assets';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';


const allowedVoters = () => {
  const [fileUrl,setFIleUrl] = useState(null);
  const [formInput,setFormInput] = useState({
    name: '',
    address: '',
    positon: '',
  });

  const router = useRouter();
  const {uploadToIPFS} = useContext(VotingContext);

  //Voter Image drop
  const onDrop = useCallback(async (acceptedFiles) => {
    const url = await uploadToIPFS(acceptedFiles[0]);
    setFIleUrl(url);
  });

  const {getRootProps, getInputProps} = useDropzone({onDrop,accept:"image/*",maxSize: 5000000});

  //JSX Part
  return (
    <div className={Style.createVoter}>
      <div>
        {fileUrl && (
          <div className={Style.voterInfo}> 
            <img src = {fileUrl} alt = "Voter Image"/>
            <div className={Style.voterInfo_paragraph}>
                <p>
                  Name : <span>&nbps; {formInput.name} </span> 
                </p>
                <p>
                  Add : &nbps; <span> {formInput.address.slice(0,20)} </span>
                </p>
                <p>
                  Pos : &nbps; <span> {formInput.positon} </span>
                </p>
            </div>
          </div>
        )}
        {
          !fileUrl && (
            <div className={Style.sideInfo}>
              <div className = {Style.sideInfo_box}>
                <h4>Create Candidate for Voting</h4>
                <p>
                  Blockchain voting Organization
                </p>
                <p className= {Style.sideInfo_para}>Contract Candidate</p>
              </div>
              <div className={Style.car}>
                {/* {voterArray.map((el,i)=>(
                <div key = {i+1} className={Style.card_box}>
                  <div className={Style.image}> 
                    <img src="" alt="Profile photo"/>
                  </div>
                  <div className={Style.card_info}>
                    <p>Name</p>
                    <p>Address</p>
                    <p>Details</p>
                    </div>
                </div>
                ))} */}
              </div>
            </div>
          )
        }
      </div>
      <div className={Style.voter}>
        <div className={Style.voter__container}>
          <h1>Create Voter</h1>
          <div className={Style.voter__container__box}> 
            <div className={Style.voter__container__box__div}>
              <div {...getRootProps()}>
                <input {...getInputProps()} />

                <div className={Style.voter__container__box__div__info}>
                  <p>Upload file : JPG,PNG,GIF,WEBM Max 10MB</p>
                  <div className={Style.voter__container__box__div__image}>
                    <Image src = {images.creator} width = {150} height = {150} objectFit="contain" alt="File Upload"/>
                  </div>
                  <p>Drag and Drop File</p>
                  <p>or Browse Media</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={Style.input__container}> 
          <Input 
            inputType = "text" 
            title = "Address"
            placeholder = "Voter Name" 
            handeleClick = {(e) =>
            setFormInput({ ...formInput,name: e.target.value })
            }
          />
        </div>        
      </div>
    </div>
  )
};

export default allowedVoters;