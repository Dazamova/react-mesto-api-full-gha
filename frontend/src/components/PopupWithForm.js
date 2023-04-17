import React from "react";
export const PopupWithForm = (props) => {
  
  const form = React.useRef(null);

  React.useEffect(() => {
    if(props.isOpen){
      form.current.reset();
    }
  }, [props.isOpen])

  return (
    <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className={`popup__container popup__container_${props.name}`}>
        <button type="button" aria-label="Закрыть" className="popup__close-button" onClick={props.onClose}></button>
        <h2 className={`popup__heading popup__heading_${props.name}`}>{props.heading}</h2>
        <form ref={form} name={`${props.name}`} className={`popup__form popup__${props.name}`} onSubmit={props.onSubmit}>
          {props.children}
          <button name="submit" type="submit" className="popup__save-button">{props.buttonText}</button>
        </form>
      </div>
    </div>
  )
}