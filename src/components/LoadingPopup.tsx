
export default function LoadingPopup() {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        }}>
            <div style={{
                padding: '20px',
                backgroundColor: 'white',
                borderRadius: '5px',
                textAlign: 'center'
            }}>
                <img src="https://play-lh.googleusercontent.com/DsyWoouXk7psjF7DCG6MJj_rX9RR9-liQskZXoKvcqQIu_ybUm4F5RntxWh1IZAVSLI" alt="Loading" style={{ width: '50px', height: '50px' }} />
                <p>Loading...</p>
            </div>
        </div>
    );
}