import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BASE_URL, getUploadUrl, postProfileImg } from "../../../URL/url";
import styles from "./EditUserImg.module.scss";
import { ColorRing } from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const EditUserImg = () => {
  const [previewImg, setPreviewImg] = useState();
  const [isLoadingImg, setIsLoadingImg] = useState(false);
  const [isUploadError, setIsUploadError] = useState(false);
  const { register, handleSubmit } = useForm();

  /**user프로필이미지 보여주기 */
  useEffect(() => {
    const showUserProfile = async () => {
      await axios.get(`${BASE_URL}users/mypage/`).then((res) => {
        setPreviewImg(res.data.profileImg);
      });
    };

    showUserProfile();
  }, []);

  /**사진 수정하기 기능 */
  const imgSubmit = async (img) => {
    setIsLoadingImg(true);
    setIsUploadError(false);

    const res = await getUploadUrl(img);

    if (!res) {
      setIsLoadingImg(false);
      setIsUploadError(true);
      return;
    }
    const profileImg = { profileImg: res.variants[0] };

    postProfileImg(profileImg);
    setIsLoadingImg(false);
    setIsUploadError(false);
  };

  /**profile 미리보기 */
  const changeImg = ({ target }) => {
    const reader = new FileReader();
    const file = target.files[0];

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setPreviewImg(reader.result);
    };
  };

  return (
    <div className={styles.profileDiv}>
      <h2>프로필 정보</h2>
      <img src={previewImg} alt="" />
      <form className={styles.uploadForm} onSubmit={handleSubmit(imgSubmit)}>
        <div className={styles.uploadFile}>
          <input
            type="file"
            {...register("file")}
            accept="image/*"
            onChange={changeImg}
          />
          <FontAwesomeIcon
            icon={faCamera}
            style={{ color: "white" }}
            fixedWidth
          />
        </div>
        <button type="submit">변경하기</button>
        {!isLoadingImg ? null : <ColorRing height={20} width={20} />}
        {isUploadError ? <p>이미지를 다시 올려주세요.</p> : null}
      </form>
    </div>
  );
};

export default EditUserImg;
