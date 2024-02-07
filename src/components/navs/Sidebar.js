import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { SidebarData } from './SidebarData';
import Navbar from './Navbar';
import { Link, useLocation } from 'react-router-dom';
import PortalPopup from '../PortalPopup';
import LogoutModal from '../LogoutModal';

function Sidebar() {
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

  const onFeature4Container1Click = useCallback(() => {}, []);

  const onFeature4ContainerClick = useCallback(() => {}, []);

  useEffect(() => {
    document.body.style.zoom = '86%';
  }, []);

  const onFeature5ContainerClick = useCallback(() => {}, []);

  const openLogoutModal = useCallback(() => {
    setLogoutModalOpen(true);
  }, []);

  const closeLogoutModal = useCallback(() => {
    setLogoutModalOpen(false);
  }, []);

  const location = useLocation();

  return (
    <>
    <div style={{ float: 'left' }}>
      <SideBardefault>
        <FrameParent31>
          <OverviewParent>
            <Savi>Overview</Savi>
            <Feature1Parent>
              {SidebarData.map(
                (val, key) => {
                  if (val.link === '/dashboard') {
                    return location.pathname === '/dashboard' ? (
                      <>
                      <Link style={{textDecoration:'none',color:'inherit'}} to={val.link}>
                        <Feature1>
                          <VuesaxbulkhomeIcon1 alt="" src={val.iconActive} />
                          <Dashboard1>{val.title}</Dashboard1>
                        </Feature1>
                      </Link>
                        
                      </>
                    ) : (
                      <Link style={{textDecoration:'none',color:'inherit'}} to={val.link}>
                      <Feature3>
                        <VuesaxbulkhomeIcon1 alt="" src={val.icon} />
                        <Savi>{val.title}</Savi>
                      </Feature3>
                      </Link>
                    );
                  } else if(val.link === '/mygoals' || val.link === '/personalsaving' || val.link === '/personal-saving-details'){
                    return location.pathname === '/mygoals' ? (
                      <>
                      <Link style={{textDecoration:'none',color:'inherit'}} to={val.link}>
                        <Feature1>
                          <VuesaxbulkhomeIcon1 alt="" src={val.iconActive} />
                          <Dashboard1>{val.title}</Dashboard1>
                        </Feature1>
                        </Link>
                      </>
                    ) :location.pathname === '/personalsaving' ? (
                      <>
                      <Link style={{textDecoration:'none',color:'inherit'}} to={val.link}>
                        <Feature1>
                          <VuesaxbulkhomeIcon1 alt="" src={val.iconActive} />
                          <Dashboard1>{val.title}</Dashboard1>
                        </Feature1>
                        </Link>
                      </>
                    ):location.pathname === '/personal-saving-details' ? (
                      <>
                      <Link style={{textDecoration:'none',color:'inherit'}} to={val.link}>
                        <Feature1>
                          <VuesaxbulkhomeIcon1 alt="" src={val.iconActive} />
                          <Dashboard1>{val.title}</Dashboard1>
                        </Feature1>
                        </Link>
                      </>
                    ): (
                      <Link style={{textDecoration:'none',color:'inherit'}} to={val.link}>
                      <Feature3>
                        <VuesaxbulkhomeIcon1 alt="" src={val.icon} />
                        <Savi>{val.title}</Savi>
                      </Feature3>
                      </Link>
                    );
                  }
                  else if(val.link === '/groups' || val.link==='/explore-groups'){
                    return location.pathname === '/groups' ? (
                      <>
                      <Link style={{textDecoration:'none',color:'inherit'}} to={val.link}>
                        <Feature1>
                          <VuesaxbulkhomeIcon1 alt="" src={val.iconActive} />
                          <Dashboard1>{val.title}</Dashboard1>
                        </Feature1>
                        </Link>
                      </>
                    ) :location.pathname === '/explore-groups' ? (
                      <Link style={{textDecoration:'none',color:'inherit'}} to={val.link}>
                      <Feature1>
                        <VuesaxbulkhomeIcon1 alt="" src={val.iconActive} />
                        <Dashboard1>{val.title}</Dashboard1>
                      </Feature1>
                      </Link>
                    ):(
                      <Link style={{textDecoration:'none',color:'inherit'}} to={val.link}>
                      <Feature3>
                        <VuesaxbulkhomeIcon1 alt="" src={val.icon} />
                        <Savi>{val.title}</Savi>
                      </Feature3>
                      </Link>
                    );
                  }
                  else if(val.link === '/personalsavingnogoal'){
                    return location.pathname === '/personalsavingnogoal' ? (
                      <>
                      <Link style={{textDecoration:'none',color:'inherit'}} to={val.link}>
                        <Feature1>
                          <VuesaxbulkhomeIcon1 alt="" src={val.iconActive} />
                          <Dashboard1>{val.title}</Dashboard1>
                        </Feature1>
                        </Link>
                      </>
                    ) : (
                      <Link style={{textDecoration:'none',color:'inherit'}} to={val.link}>
                      <Feature3>
                        <VuesaxbulkhomeIcon1 alt="" src={val.icon} />
                        <Savi>{val.title}</Savi>
                      </Feature3>
                      </Link>
                    );
                  }

                  else if(val.link === '/transactions'){
                    return location.pathname === '/transactions' ? (
                      <>
                      <Link style={{textDecoration:'none',color:'inherit'}} to={val.link}>
                        <Feature1>
                          <VuesaxbulkhomeIcon1 alt="" src={val.iconActive} />
                          <Dashboard1>{val.title}</Dashboard1>
                        </Feature1>
                        </Link>
                      </>
                    ) : (
                      <Link style={{textDecoration:'none',color:'inherit'}} to={val.link}>
                      <Feature3>
                        <VuesaxbulkhomeIcon1 alt="" src={val.icon} />
                        <Savi>{val.title}</Savi>
                      </Feature3>
                      </Link>
                    );
                  }
                }
              )}
            </Feature1Parent>
            
          </OverviewParent>

          <OverviewParent>
            <Savi>Others</Savi>
            <Feature1Parent>
           
          <Feature3 onClick={onFeature4Container1Click}>
              <VuesaxbulkhomeIcon1 alt="" src="/setting-2.png" />
              <Savi>Settings</Savi>
            </Feature3>
              <Feature3 onClick={openLogoutModal}>
                <VuesaxbulkhomeIcon1 alt="" src="/logout.png" />
                <Savi>Logout</Savi>
              </Feature3>
            </Feature1Parent>
          </OverviewParent>
        </FrameParent31>
        {/* <Navbar /> */}
      </SideBardefault>
    </div>
    {isLogoutModalOpen && (
      <PortalPopup
        overlayColor="rgba(113, 113, 113, 0.3)"
        placement="Centered"
        onOutsideClick={closeLogoutModal}
      >
        <LogoutModal onClose={closeLogoutModal} />
      </PortalPopup>
    )}
    </>
  );
}

export default Sidebar;

const OverviewParent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-5xl);
`;


const Feature1 = styled.div`
  border-radius: var(--br-5xs);
  background-color: var(--primary-color);
  width: 13.94rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: var(--padding-3xs);
  box-sizing: border-box;
  gap: var(--gap-3xs);
  color: var(--white);

  

`;

const FrameParent31 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-5xl);
  text-align: left;
  font-size: var(--text-md-medium-size);
  color: var(--grey-400);
  font-family: var(--text-md-medium);
`;

const Dashboard1 = styled.div`
  position: relative;
  letter-spacing: 0.15px;
  line-height: 140%;
  font-weight: 600;
`;
const Savi = styled.div`
  position: relative;
  letter-spacing: 0.15px;
  line-height: 140%;
  //color: black;

  &:hover {
    color: white;
  }
`;

const Feature1Parent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-5xs);
  color: var(--main-text);
`;

const Feature3 = styled.div`
  border-radius: var(--br-5xs);
  background-color: var(--white);
  width: 13.94rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: var(--padding-3xs);
  box-sizing: border-box;
  gap: var(--gap-3xs);
  cursor: pointer;

  &:hover {
    background-color: #b5179e;
    color: white;
    border-radius: 8px;
    cursor: pointer;
  }
`;

const VuesaxbulkhomeIcon1 = styled.img`
  position: relative;
  width: 1.5rem;
  height: 1.5rem;
  object-fit: cover;
`;

const SideBardefault = styled.div`
  position: fixed;
  top: 6rem;
  left: 0rem;
  background-color: var(--white);
  // height: 100vh;
  // overflow-y:scroll;
  // overflow-x:hidden;
  width: 17.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-5xl);
  box-sizing: border-box;
  gap: var(--gap-5xl);
  text-align: center;
  font-size: 2rem;
  color: var(--primary-color);
  font-family: var(--font-bodoni-moda);
`;
