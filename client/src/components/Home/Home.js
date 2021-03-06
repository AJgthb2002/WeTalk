//imports
import React, { useRef, useState, useEffect } from 'react';
import socket from '../../socket';

//------------------------------------------------------------------------------------------

const Home = (props) => {
    const roomRef = useRef();
    const userRef = useRef();
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {

        socket.on('duplicate-user', ({ error }) => {
            if (!error) {
                // save the username and meeting title entered by user
                const roomName = roomRef.current.value;
                const userName = userRef.current.value;

                sessionStorage.setItem('user', userName);
                props.history.push(`/room/${roomName}`);
            } else {
                setErr(error);
                setErrMsg('User name already exists');
            }
        });
    }, [props.history]);

    // when join meet button is pressed
    function clickJoin() {
        // save the username and meeting title entered by user
        const roomName = roomRef.current.value;
        const userName = userRef.current.value;


        // if username or title is missing, display an error message
        if (!roomName || !userName) {
            setErr(true);
            setErrMsg('Enter both Username and Meeting Title');
        }
        else {
            socket.emit('check-user', { roomId: roomName, userName });
            sessionStorage.setItem('user', userName);
            props.history.push(`/room/${roomName}`);
        }
    }
    return (
        <>
            {/* navbar starts */}
            <header className="header-area header-sticky">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <nav className="main-nav">
                                {/* main logo */}
                                <div className="logo">
                                    <img src="images\WeTalk_logo.png"></img>
                                </div>
                                {/* title of webapp */}
                                <div className="logo">
                                    WeTalk Video Chat
                                </div>

                                {/* links */}
                                <ul className="nav">
                                    <li><a href="#welcome" className="active">Home</a></li>
                                    <li><a href="#work-process">Features</a></li>
                                    <li><a href="#contact">Contact</a></li>
                                </ul>
                                <a className='menu-trigger'>
                                    <span>Menu</span>
                                </a>

                            </nav>
                        </div>
                    </div>
                </div>
            </header>
            {/* navbar ends */}

            {/* welcome area starts */}
            <div className="welcome-area" id="welcome">
                <div className="header-text">
                    <div className="container">
                        <div className="row">
                            <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8 col-md-12 col-sm-12">
                                <h1 style={{ color: "white" }}>Introducing <strong>WeTalk</strong><br /> </h1>
                                <h4 style={{ color: "white" }}>Instantly connect with your friends online. <br />NO sign ups, NO downloads!</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* welcome area ends */}

            {/* Join meeting box starts */}
            <section className="section home-feature">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row">
                                <div className="col-lg-3 col-md-3 col-sm-12" data-scroll-reveal="enter bottom move 50px over 0.6s after 0.2s">
                                </div>

                                <div className="col-lg-6 col-md-6 col-sm-12" data-scroll-reveal="enter bottom move 50px over 0.6s after 0.2s">
                                    <div className="features-small-item">
                                        <div >
                                        {/* Abstract vector created by vectorjuice - www.freepik.com */}
                                            <img src="images\start_video_call.svg" alt="" height="100%" width="80%" />
                                        </div>
                                        <br />
                                        {/* username input */}
                                        <div className="form-floating mb-3">
                                            <label for="floatingInput"><b>Username</b></label>
                                            <input type="text" className="form-control" id="userName" ref={userRef} placeholder="e.g. socialbutterfly" />
                                        </div>

                                        {/* Meeting title input */}
                                        <div className="form-floating">
                                            <label for="floatingPassword"><b>Meeting Title</b></label>
                                            <input type="text" className="form-control" id="roomName" ref={roomRef} placeholder="e.g. Engage AMA Session" />
                                        </div>

                                        <br />
                                        {/* join meet button */}
                                        <button className="btn-md myButton" onClick={clickJoin}>Join Meet</button>
                                        <br />
                                        <br />
                                        {/* if username or title is missing, error is displayed */}
                                        {err ? <p style={{ color: "red" }}>{errMsg}</p> : null}

                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-12" data-scroll-reveal="enter bottom move 50px over 0.6s after 0.2s">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* join meeting box ends */}

            {/* Features section starts */}
            <section className="mini" id="work-process">
                <div className="mini-content">
                    <div className="container">
                        <div className="row">
                            <div className="offset-lg-3 col-lg-6">
                                <div className="info">
                                    <h1>Features</h1>
                                    <p>WeTalk is loaded with several popular features  <br />
                                        Now Enjoy free video chats from anywhere, anytime!</p>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            {/* Feature 1 */}
                            <div className="col-lg-2 col-md-3 col-sm-6 col-6">
                                <div className="mini-box">
                                    <i><img src="images\work-process-item-01.png" alt="" /></i>
                                    <strong>Group Meetings</strong>
                                    <span>Connect with upto 6 people</span>
                                </div>
                            </div>
                            {/* Feature 2 */}
                            <div className="col-lg-2 col-md-3 col-sm-6 col-6">
                                <div className="mini-box">
                                    <i><img src="images\work-process-item-01.png" alt="" /></i>
                                    <strong>Group Chat</strong>
                                    <span>Chat with all members during the meet</span>
                                </div>
                            </div>
                            {/* Feature 3 */}
                            <div className="col-lg-2 col-md-3 col-sm-6 col-6">
                                <div className="mini-box">
                                    <i><img src="images\work-process-item-01.png" alt="" /></i>
                                    <strong>Screen Sharing</strong>
                                    <span>Present your screen in a single click</span>
                                </div>
                            </div>
                            {/* Feature 4 */}
                            <div className="col-lg-2 col-md-3 col-sm-6 col-6">
                                <div className="mini-box">
                                    <i><img src="images\work-process-item-01.png" alt="" /></i>
                                    <strong>Multiple Browser compatibility</strong>
                                    <span></span>
                                </div>
                            </div>
                            {/* Feature 5 */}
                            <div className="col-lg-2 col-md-3 col-sm-6 col-6">
                                <div className="mini-box">
                                    <i><img src="images\work-process-item-01.png" alt="" /></i>
                                    <strong>Responsive Design</strong>
                                    <span>Join from any device</span>
                                </div>
                            </div>
                            {/* Feature 6 */}
                            <div className="col-lg-2 col-md-3 col-sm-6 col-6">
                                <div className="mini-box">
                                    <i><img src="images\work-process-item-01.png" alt="" /></i>
                                    <strong>Custom Meeting Name</strong>
                                    <span>Share meet name to invite others</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Features section ends */}

            {/* Contact section starts */}
            <footer id="contact">
                <div className="container" >
                    <div className="row">
                        {/* links to social profiles */}
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <ul className="social">
                                <li><a href="https://github.com/AJgthb2002/WeTalk" target="_blank"><i className="fa fa-github"></i></a></li>
                                <li><a href="https://www.linkedin.com/in/ananya-a-joshi" target="_blank"><i className="fa fa-linkedin"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <p className="copyright">Copyright &copy; 2021 Ananya Joshi</p>
                        </div>
                    </div>
                </div>
            </footer>
            {/* Contact section ends */}
        </>

    );

};
export default Home;
