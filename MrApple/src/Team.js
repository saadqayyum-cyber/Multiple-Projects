import { useState, useContext, useEffect } from 'react';

import { ContentContext } from './contexts/contentContext';

import * as S from './css/Team';
import { BasicApple } from './Apple';
import { TwitterGreen } from './Icons';
import Container from './css/globals/Container';

import { fetchTeamMembers } from './utils/contentfulUtils'

function Member({ sourceImage, name, role, socialMediaLink }) {
  return (
    <S.Member sm={12} md={4}>
      <BasicApple sourceImage={sourceImage} teamApple={true} />
  
      <S.MemberWrapper>
        <TwitterGreen size={40} link={socialMediaLink} />
        <S.MemberName>{name}</S.MemberName>
      </S.MemberWrapper>
      <S.MemberRole>{role}</S.MemberRole>
    </S.Member>
  );
}

export default function Team() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [isDescriptionCollapsed, setIsDescriptionCollapsed] = useState(true);

  const { sectionsContent } = useContext(ContentContext);
  const descriptionContent = sectionsContent.find(section => section.index === 6)

  const parsedDescription = descriptionContent?.description?.split('\n').filter(el => el) || []

  const handleClick = () => {
    if (isDescriptionCollapsed) return setIsDescriptionCollapsed(false);
    return setIsDescriptionCollapsed(true);
  };

  useEffect(() => {
    fetchTeamMembers()
    .then((response) => response.json())
    .then(({ data }) => { setTeamMembers(data.teamMemberCollection.items) });
  }, [])

  return (
    <section>
      <Container>
        <S.TitleRow>
          <S.Title>{descriptionContent?.title}</S.Title>
        </S.TitleRow>

        <S.Row>
          {teamMembers.map(teamMember => {
            return (
              <Member
                key={teamMember?.name}
                name={teamMember?.name}
                role={teamMember?.role}
                sourceImage={teamMember?.image.url}
                socialMediaLink={teamMember?.socialMediaLink}
              />
            )
          })}
        </S.Row>

        <S.SimpleRow>
          <S.Description>{parsedDescription[0]}</S.Description>

          {!isDescriptionCollapsed && (
            <>
              <S.Description dangerouslySetInnerHTML={{ __html: parsedDescription[1] }} />
              <S.Description>{parsedDescription[2]}</S.Description>
            </>
          )}
        </S.SimpleRow>

        <S.SimpleRow>
          <S.Button onClick={handleClick}>
            Read {isDescriptionCollapsed ? 'more' : 'less'}
          </S.Button>
        </S.SimpleRow>

        <S.ScreamingRow>
          <p>We don't believe in omnipresence</p>
          <h2>1 team 1 project!</h2>
        </S.ScreamingRow>
      </Container>
    </section>
  );
}
