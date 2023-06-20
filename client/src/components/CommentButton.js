export function CommentButton({ Icon, isActive, color, children, ...props }) {
    return (
        <button 
            className={`button icon-button ${isActive ? "icon-button-active" : ""} ${color || ""}`}
            {...props}
        >
            <span className={`${children != null ? "mr-1" : ""}`}>
                <Icon />
            </span>
            { children }
        </button>
    )
}