import React, { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarInputRef = useRef("");

  useEffect(() => {
    avatarInputRef.current.value = "";
  }, [isOpen]);

  function handleSubmitAvatar(evt) {
    evt.preventDefault();

    onUpdateAvatar(
      {
        avatar: avatarInputRef.current.value,
      },
      []
    );
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="avatar-input"
      title="Обновить аватар"
      btnName="Сохранить"
      onSubmit={handleSubmitAvatar}
    >
      <input
        className="popup__input popup__input_value_avatar"
        id="avatar-input"
        placeholder="Ссылка на новый аватар"
        type="url"
        name="avatar"
        required
        ref={avatarInputRef}
      />

      <span className="popup__input-error avatar-input-error"></span>
    </PopupWithForm>
  );
}
