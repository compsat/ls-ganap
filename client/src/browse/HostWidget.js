import React, { Component } from 'react';
import styled from 'styled-components';
import HostList from './HostList';
import WidgetContainer from './WidgetContainer';

const HostWidgetList = styled(HostList)`
  margin-left: 0;
`

class HostFilterWidget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hosts: {},
      activeHost: '',
    };
    this.props.setHost('All');
  }

  setWidgetState = (host) => {
    this.setState({activeHost: host});

    const displayHost = host.length ? host : 'All';
    this.props.setHost(displayHost);
  }

  componentDidMount = () => {
    this.setState({
      hosts: {
        "Organizations": {
          "Council of Organizations of the Ateneo": {
            "Analysis and Discourse Cluster": [
              "Ateneo Debate Society (ADS)",
              "Ateneo Association of European Studies Students (AEuSS)",
              "Ateneo Economics Association (AEA)",
              "Ateneo Project for Asian and International Relations (APAIR)",
              "Ateneo Statistics Circle (A-Stat)",
              "Development Society of the Ateneo (DevSoc)",
              "Enterteynment para sa Tao, Bayan, Lansangan at Diyos (ENTABLADO)",
            ],
            "Business Cluster": [
              "The Ateneo Assembly Association for Communications Technology Management (ACTM)",
              "AIESEC Ateneo de Manila",
              "Ateneo Junior Marketing Association (AJMA)",
              "Ateneo Lex",
              "Ateneo Management Association (AMA)",
              "Ateneo Management of Applied Chemistry Association (MACA)",
              "Ateneo Management Engineering Association (MEA)",
              "Ateneo Management Economics Organization (MEcO)",
            ],
            "Faith Formation Cluster": [
              "Ateneo Christian Life Community (ACLC)",
              "Ateneo College Ministry Group (ACMG)",
              "Ateneo Student Catholic Action (AtSCA)",
              "Youth for Christ - Ateneo (YFC - A)",
            ],
            "Health and Environment Cluster": [
              "Ateneo Environmental Science Society (A-ESS)",
              "Loyola Mountaineers (LM) Ateneo",
              "PEERS",
              "Pre-Medical Society of the Ateneo (PMSA)",
            ],
            "Intercultural Relations Cluster": [
              "Ateneo Lingua Ars Cultura (ALAC)",
              "Ateneo Student Exchange Council (ASEC)",
              "Ateneo Celadon",
            ],
            "Media and the Creative Arts Cluster": [
              "Ateneo Association of Communication Majors (ACOMM)",
              "Ateneo Musicians' Pool (AMP)",
              "Collegiate Society of Advertising (CoSA)",
              "Loyola Film Circle (LFC)",
            ],
            "Performing Arts Cluster": [
              "Ateneo de Manila College Glee Club (ACGC)",
              "Ateneo Blue Repertory (BlueRep)",
              "Ateneo Blue Symphony (BlueSymph)",
              "Company of Ateneo Dancers (CADs)",
              "Tanghalang Ateneo (TA)",
            ],
            "Sector Based Cluster": [
              "Ateneo Consultants for Organization Development and Empowerment (Ateneo CODE)",
              "Ateneo Gabay",
              "Kaingin",
              "Kythe-Ateneo",
              "Musmos Organization",
              "Ateneo Special Education Society (SPEED)",
              "Tugon",
            ],
            "Science and Technology Cluster": [
              "Ateneo Chemistry Society (ACheS)",
              "Ateneo Electronics and Computer Engineering Society (AECES)",
              "Ateneo Mathematics Society (AMS)",
              "Ateneo Biological Organization - eXplore eXperience eXcel (BOx)",
              "Computer Society of the Ateneo (CompSAt)",
              "Ateneo League of Physicists (LeaPs)",
              "Ateneo Management Information Systems Association (MISA)",
              "Ateneo Psyche",
            ],
          },
          "Confederation of Publications": [
            "The GUIDON",
            "Heights",
            "Matanglawin",
          ],
        },
        "Offices": [
          "Office of the Vice President",
          "Ateneo Placement Office",
          "College Athletics Office",
          "Loyola Schools Bookstore",
          "Office of Administrative Services",
          "Office of Guidance and Counselling",
          "Office of the Associate Dean for Academic Affairs (ADAA)",
          "Office of the Associate Dean for Student Affairs (ADSA)",
          "Office of the Campus Ministry",
          "Office of Health Services",
          "Office of Management Information Systems",
          "Office of the Registrar",
          "Office for Social Concern and Involvement (OSCI)",
          "Office of Student Activities",
          "Physical Education Program",
          "Residence Halls",
          "Rizal Library",
          "Ateneo Art Gallery",
        ],
        "Sanggunian": [
          "Sanggunian ng mga Mag-Aaral",
          "Ateneo Commission on Elections",
          "Department on Student Welfare and Services",
          "Sanggunian - JGSOM School Board",
          "Office of the Ombudsman",
          "Sanggunian - School of Humanities",
          "Sanggunian - School of Science and Engineering",
          "Sanggunian - School of Social Sciences",
          "Sanggunian - Student Judicial Court",
        ],
      }
    });
  }

  render() {
    return (
      <WidgetContainer>
        <HostWidgetList
          item={this.state.hosts}
          parentActiveHost=""
          setActiveHost={this.setWidgetState}
        />
      </WidgetContainer>
    );
  }
}

export default HostFilterWidget;