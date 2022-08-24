import React from 'react';

const Footer = () => {
    return (
        <footer>
            <div className='footerWrap inner'>
                <div className='footerInnerTop'>
                    <ul className='footerTopLeft'>
                        <li>
                            <h3>템퍼스</h3>
                            <ul className='footerTopChildUl'>
                                <li>공지사항</li>
                                <li>템퍼스소개</li>
                                <li>파트너제의</li>
                            </ul>
                        </li>
                        <li>
                            <h3>고객센터</h3>
                            <ul className='footerTopChildUl'>
                                <li>고객문의</li>
                                <li>이용가이드</li>
                            </ul>
                        </li>
                        <li>
                            <h3>정책</h3>
                            <ul className='footerTopChildUl'>
                                <li>운영정책</li>
                                <li>이용약관</li>
                                <li>개인정보처리방침</li>
                            </ul>
                        </li>
                        <li>
                            <h3>SNS</h3>
                            <ul className='footerTopChildUl'>
                                <li>트위터</li>
                                <li>페이스북</li>
                                <li>인스타그램</li>
                                <li>유튜브</li>
                            </ul>
                        </li>
                    </ul>
                    <h2>TEMPUS</h2>
                </div>
                <div className='footerInnerBottom'>
                    <div className='footerBottomInfo'>
                        <h2>(주) 템퍼스</h2>
                        <ul>
                            <li>
                                <span className='footerMarginSpan'>
                                    <strong>주소</strong>
                                    <span>: 템퍼스시 템퍼스구 템퍼스로 123-1 템퍼스퀘어</span>
                                </span>
                                <span>
                                    <strong>대표</strong>
                                    <span>: 박현진</span>
                                </span>
                            </li>
                            <li>
                                <span className='footerMarginSpan'>
                                    <strong>사업자등록번호</strong>
                                    <span>: 123-45-67890</span>
                                </span>
                                <span className='footerMarginSpan'>
                                    <strong>대표번호</strong>
                                    <span>: 01-234-5678</span>
                                </span>
                                <span className='footerMarginSpan'>
                                    <strong>고객센터</strong>
                                    <span>: 98-765-4321</span>
                                    <span>운영시간 09:00 ~ 18:00</span>
                                </span>
                                <span>
                                    <strong>통신판매업신고</strong>
                                    <span>: 2022-123456-78-9012</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='footerBottom'>
                <div className='inner'>
                    <p>Funding site 'TEMPUS' is imaginary site that I made. TEMPUS means 'time' in Latin. The reason why I named it Time is the most valuable thing to me. And it was also the most necessary thing to do my project.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;