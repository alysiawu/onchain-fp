export const ButtonGreen = ({
    onClick,
    copy,
    disabled
}: {
    onClick: () => void,
    copy: string,
    disabled?: boolean
}) => {
    return (
        <a style={{
            background: '#19FDA6', padding: '10px 20px', 'boxShadow': '0 0 50px #19FDA6', borderRadius: '20px', color: '#111',
            cursor: 'pointer'
    
    }} onClick={onClick} >{copy}</a>
    )
}