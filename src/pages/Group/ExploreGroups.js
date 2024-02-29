import { useEffect, useState, useCallback } from 'react';
import AddMoreGoals from '../../components/AddMoreGoals';
import PortalPopup from '../../components/PortalPopup';
import LogoutModal from '../../components/LogoutModal';
import styled from 'styled-components';
import GroupFrame from '../../components/GroupFrame';
import Success from '../../components/modal/Success';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

const ExploreGroups = ({ sort }) => {
  const [isAddMoreGoalsOpen, setAddMoreGoalsOpen] = useState(false);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [isGroupFrameOpen, setGroupFrameOpen] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [activeSavings, setActiveSavings] = useState([]);
  const [allTrans, setAllTrans] = useState([]);
  const [newSavings, setNew] = useState([]);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });


  
  const fetchData = async () => {

    var response = null;
      try {
        if(localStorage.getItem('userRole')==="User"){
            response = await fetch(
          `https://localhost:7226/api/Group/ExploreGroups
          `
        );
        }else{
           response = await fetch(
            `https://localhost:7226/api/Group/get-all-group`
          );
        }
       
        const result = await response.json();
        if (result.succeeded) {

          setAllTrans(result.data);
          // const today = new Date().toISOString().slice(0, 10);
             const active = result.data.filter((item) =>item.groupStatus ===1);
             setActiveSavings(active);

             const today = new Date().toISOString().slice(0, 10);
             const neww = result.data.filter((item) =>item.groupStatus ===2);
             setNew(neww);            
            //  setTransactions(response.data.data);
          //console.log("rese",response.data.data);

          console.log('dataa', result.data);
          setActiveSavings(result.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

  useEffect(() => {  
    fetchData();
  }, []);

  const refreshGroup = useCallback(() => {
    fetchData();
  }, []);

  const closeAddMoreGoals = useCallback(() => {
    setAddMoreGoalsOpen(false);
  }, []);


  const closeGroupFrame = useCallback(() => {
    setGroupFrameOpen(false);
  }, []);

  const toggleGroupFramee = useCallback(() => {
    setGroupFrameOpen(true);
  }, []);
  const toggleGroupFrame = (event) => {
    const { clientX, clientY } = event;
    const popupTop = clientY; // Example: 10px below the clicked component
    const popupLeft = clientX; // Same left position as the clicked component
    setPopupPosition({ top: popupTop, left: popupLeft });
    setGroupFrameOpen(true);
  }

  const closeLogoutModal = useCallback(() => {
    setLogoutModalOpen(false);
  }, []);

  function formatDate(dateString) {
    // Given date
    var givenDate = new Date(dateString);

    // Check if the given date is valid
    if (isNaN(givenDate.getTime())) {
        return "Invalid date";
    }

    // Output date in the format 29 Feb, YYYY
    var outputDate = givenDate.getDate() + " Feb, " + givenDate.getFullYear();
    return outputDate;
}

  function getDuration(date1String, date2String) {
    // Parse the date strings into Date objects
    var date1 = new Date(date1String);
    var date2 = new Date(date2String);

    // Calculate the difference in milliseconds
    var differenceMs = date2 - date1;

    // Convert milliseconds to days
    var differenceDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24));

    // Convert days to months, weeks, and remaining days
    var months = Math.floor(differenceDays / 30);
    var remainingDays = differenceDays % 30;
    var weeks = Math.floor(remainingDays / 7);
    var days = remainingDays % 7;

    months = months===0?"":months;
    weeks = weeks===0?"":weeks;
    days = days===0?"":days;
  
    months = months ===1?months+" mon":months===""?"":months+" mons";
    weeks = weeks ===1?weeks+" week":weeks===""?"":weeks+" weeks";
    days = days ===1?days+" day":days===""?"":days+" days";
   return months+" "+ weeks+" "+days;
}
const JoinNow = (val,groupSavingsId)=>{
Swal.fire({
  title:'Do you want to join '+val+' group?',
  showDenyButton: true,
  confirmButtonText:'Yes',
  denyButtonText:'Cancel'
}).then(async (result)=>{
  if(result.isConfirmed){
    
   await axios.post(
      'https://localhost:7226/api/GroupMembers/join-group',
      {
        userId,
        groupSavingsId,
      }
    ).then(response => {
        console.log("data",response.data);
        if(response.data.succeeded){
          Swal.fire('Successful','You joined '+ val+' successfully. The contribution will commence immediately all the slots are occupied','success');
           refreshGroup();
        }else{
          Swal.fire('KYC NOT FOUND',response.data.message,'error');
         
          //toast.error("aa"+response.data.message);
        }        
      }).catch(error => {
        if (error.response) {
          toast.error(""+error.response.data.message);
        //  console.error('Server responded with error status:', error.response.data);
        } else if (error.request) {
          console.error('No response received from server:', error.request);
        } else {
          console.error('Error setting up request:', error.message);
        }
      });

   }
});
}
  return (
    <div style={{ width: '100%' }}>
      {
      activeSavings.length===0?(
        <NoGroup>
          No explore group found
        </NoGroup>
      ):(
        activeSavings.map((activesaving) => (
          <FrameParent>
            <FrameDiv>
              <FrameChild
                alt=""
                src={activesaving.safePortraitImageURL}
              />
              
              <BadgeParent>
                <Badge>
                  <BadgeAndTag>
                    <AvatarIcon alt="" src="/avatar@2x.png" />
                    <StarsIcon alt="" src="/stars.svg" />
                    <Placeholder1>
                      <Status1 />
                      <Placeholder>{activesaving.groupStatus===0?"Waiting":activesaving.groupStatus===1?"Ongoing":"Ended"}</Placeholder>
                    </Placeholder1>
  
                    <StarsIcon alt="" src="/chevronright.svg" />
                    <CloseIcon>
                      <XLgIcon alt="" src="/xlg.svg" />
                    </CloseIcon>
                  </BadgeAndTag>
                  {localStorage.getItem("userRole")==="User"?(<JoinContainer>
                    {/* <Group111Image alt="" src="/group111.png" /> */}
                    <Join onClick={() => { JoinNow(activesaving.groupName,activesaving.id) }}><JoinText>Join</JoinText></Join>
                    <VerticalDotsImage
                      alt=""
                      src="/dots-vertical.svg"
                      onClick={toggleGroupFrame}
                    />
                  </JoinContainer>):( <></>)}
                

                </Badge>
                <TripToBali className="mt-3">{activesaving.groupName}</TripToBali>
                <InnerText>{activesaving.purposeAndGoal}</InnerText>
                <ImageContainer>
                  <GroupSection >
                    <GroupTitle>Contribution</GroupTitle>
                    <Subtitle>&#x20A6; {parseFloat(activesaving.contributionAmount).toLocaleString()}</Subtitle>
                  </GroupSection>
                  <GroupSection >
                    <GroupTitle>Exp. Withdrawal</GroupTitle>
                    <Subtitle>&#x20A6; {parseFloat(activesaving.contributionAmount * 5).toLocaleString()}</Subtitle>
                  </GroupSection>
                  <GroupSection >
                    <GroupTitle>Saving Freq</GroupTitle>
                    <Subtitle>{activesaving.frequency===0?'Daily':activesaving.frequency===1?'Weekly':"Monthly"}</Subtitle>
                  </GroupSection>
                  <GroupSection >
                    <GroupTitle>Duration</GroupTitle>
                    <Subtitle>{getDuration(activesaving.expectedStartDate,activesaving.expectedEndDate)}</Subtitle>
                  </GroupSection>
                  <GroupSection >
                    <GroupTitle>Available Slots</GroupTitle>
                    <Subtitle>{activesaving.groupSavingsMembers.length}/5</Subtitle>
                  </GroupSection>
                </ImageContainer>
                <TextViewGroup>
                  <p>
                    <Link style={{textDecoration:'none'}} to={`/explore-group-details?id=${activesaving.id}`}>View Group</Link>
                  </p>
                </TextViewGroup>
              </BadgeParent>
            </FrameDiv>
          </FrameParent>
        ))
      )      
      }
      {isAddMoreGoalsOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeAddMoreGoals}
        >
          <AddMoreGoals onClose={closeAddMoreGoals} />
        </PortalPopup>
      )}
      {isLogoutModalOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeLogoutModal}
        >
          <LogoutModal onClose={closeLogoutModal} />
        </PortalPopup>
      )}

      {isGroupFrameOpen && (
        <PortalPopup
        style={{ position: 'absolute', top: popupPosition.top, left: popupPosition.left }}
          overlayColor="rgba(113, 113, 113, 0.3)"
          // placement="Centered"
          onOutsideClick={closeGroupFrame}
        >
          <GroupFrame onClose={closeGroupFrame} />
        </PortalPopup>
      )}
    </div>
  );
};

export default ExploreGroups;

const NoGroup = styled.div`
background:white;
text-align:center;
width:100%;
`;


const InnerText = styled.span`
font-family: Inter;
font-size: 16px;
font-weight: 400;
line-height: 22px;
letter-spacing: 0.15000000596046448px;
text-align: left;
color:#667085;
`;
const Join =  styled.div`
width: 80px;
height: 41px;
padding: 32px, 32px, 16px, 32px;
border-radius: 8px;
justify-content:center;
align-items:center;
text-align:center;
background: #B5179E;
position: relative;
cursor:pointer;
margin-right:1em;
`;
const JoinText = styled.span`
font-family: Inter;
font-size: 16px;
font-weight: 600;
//line-height: 19px;
letter-spacing: 0em;
text-align: center;
color: #FFFFFF;
position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

`;
const Subtitle = styled.p`
font-family: Inter;
font-size: 16px;
font-weight: 500;
line-height: 19px;
letter-spacing: 0em;
text-align: left;
color: #000000;
`;
const GroupTitle = styled.p`
  font-family: Inter;
  font-size: 16px;
  font-weight: 400;
  line-height: 27px;
  letter-spacing: 0.005em;
  text-align: left;
  color: #98a2b3;
`;

const FrameChild = styled.img`
  width: 131px;
  position: relative;
  border-radius: 8px;
  height: 200px;

  flex-shrink: 0;
  object-fit: cover;
`;
const AvatarIcon = styled.img`
  width: 16px;
  position: relative;
  border-radius: 999px;
  height: 16px;

  flex-shrink: 0;
  object-fit: cover;
  display: none;
`;
const StarsIcon = styled.img`
  width: 12px;
  position: relative;
  height: 12px;

  flex-shrink: 0;
  display: none;
`;
const Status1 = styled.div`
  width: 6px;
  position: relative;
  border-radius: 50%;
  background-color: #14b8a6;
  height: 6px;
  display: none;
`;
const Placeholder = styled.div`
  position: relative;
  font-weight: 500;
`;
const Placeholder1 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-top: 5px;
`;
const XLgIcon = styled.img`
  width: 8px;
  position: relative;
  height: 8px;

  flex-shrink: 0;
`;
const CloseIcon = styled.div`
  width: 100px;
  border-radius: 999px;
  background-color: #99f6e4;
  height: 15px;
  display: none;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const BadgeAndTag = styled.div`
  border-radius: 999px;
  background-color: #ccfbf1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
  gap: 1px;
  color: #14b8a6;
`;
const Badge = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: #14b8a6;
`;

const TripToBali = styled.div`
  font-family: Inter;
  font-size: 24px;
  font-weight: 500;
  line-height: 34px;
  letter-spacing: 0px;
  text-align: left;
`;

const BadgeParent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
`;

const FrameDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding: 0px 57px 0px 0px;
  gap: 40px;
`;

const FrameParent = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 10px 24px 0px 24px;
  margin-bottom: 20px;
  box-shadow: 0px 6px 16px 0px #00000029;

`;
const JoinContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const VerticalDotsImage = styled.img`
  width: 16px;
  height: 16px;
<<<<<<< HEAD
  margin-left: 40px; 
  cursor:pointer;
=======
  margin-left: 4px; // Adjust the margin as needed
>>>>>>> develop
`;

const Group111Image = styled.img`
  width: 110px;
  height: 30px;
  margin-right: 4px;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px; // Adjust the gap between images as needed
  margin-top: 20px; // Adjust the top margin as needed
`;

const TextViewGroup = styled.div`
  margin-top: 10px; // Adjust the top margin as needed
`;
const GroupSection = styled.div`
display: 'flex';
 flex-direction:column;
`