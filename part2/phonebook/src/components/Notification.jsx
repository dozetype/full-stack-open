const Notification = ({message, good}) => {
    if (message === null) return null;
    const cssClass = good? "success":"error"
    return (
        <div className={cssClass}>
            {message}
        </div>
    )
}

export default Notification
