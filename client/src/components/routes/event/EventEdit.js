import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import { format } from "date-fns";
import SVG from "react-inlinesvg";

import AppBorder from "components/common/AppBorder";
import AppButton from "components/common/AppButton";
import AppInputAutocomplete from "../../common/AppInputAutocomplete";
import AppText from "components/common/AppText";
import { media } from "style/style-utils";

const NewEventForm = styled.form`
  display: flex;
`;

const UploadArea = styled.div`
  width: 100%;

  ${media.mdScreen`
    width: 30%;
    margin-right: 5rem;
  `}
`;

const TextInputArea = styled.div`
  width: 100%;

  ${media.mdScreen`
    width: 40%;
  `}
`;

const AppTextP = AppText.withComponent("p").extend`
  margin-bottom: 1rem;
`;

const FileInputHidden = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

const UploadButton = styled(AppBorder)`
  position: relative;
  width: 100%;
  padding-top: calc(3 / 2 * 100%);
  cursor: pointer;

  &:hover {
    box-shadow: inset 0 0 0 9999px rgba(1, 1, 1, 0.15);
  }

  background-image: url('${props => props.img}');
  background-position-x: center;
  background-position-y: center;
  background-size: cover;
`;

const NewEventFormTextInput = styled(TextField).attrs({
  InputLabelProps: {
    shrink: true
  }
})`
  width: 100%;
  margin-bottom: 2rem;
`;

const NewEventFormAppInputAutocomplete = NewEventFormTextInput.withComponent(
  AppInputAutocomplete
);

const CameraIcon = styled(SVG)`
  position: absolute;
  left: 0;
  top: 50%;
  right: 0;
  width: 33.33%;
  margin: auto;
  transform: translateY(-50%);
  opacity: 0.75;
`;

const AppButtonInput = AppButton.withComponent("input");

class EventEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isUploading: false,
      name: "",
      audience: "",
      posterUrl: "",
      hosts: [],
      date: "",
      startTime: "",
      endTime: "",
      venue: "",
      description: "",
      tags: []
    };
  }

  componentDidMount = () => {
    const nextState = {
      name: this.props.name,
      audience: this.props.audience,
      description: this.props.description,
      tags: this.props.tags,
      posterUrl: this.props.posterUrl,
      hosts: this.props.hosts,
      date: this.props.date,
      startTime: this.props.start_time,
      endTime: this.props.end_time,
      venue: this.props.venue
    };

    this.setState(nextState);
  };

  handleInputChange = (input, value) => {
    this.setState({
      [input]: value
    });

    setTimeout(() => console.log(this.state), 0);
  };

  handleFileUpload = event => {
    const formData = new FormData();
    const imageFile = event.target.files[0];
    formData.append("file", imageFile);
    formData.append(
      "upload_preset",
      process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
    );

    this.setState({
      isUploading: true
    });

    // TODO: Convert into action
    axios
      .post(
        `${process.env.REACT_APP_CLOUDINARY_API_BASE_URL}/upload`,
        formData,
        {
          transformRequest: [
            (data, headers) => {
              delete headers.common.Authorization;
              return data;
            }
          ],
          headers: { "Content-Type": "multipart/form-data" }
        }
      )
      .then(response => {
        this.setState({
          isUploading: false,
          posterUrl: response.data.secure_url
        });
      });
  };

  handleSubmit = event => {
    event.preventDefault();

    const logistics = isNaN(this.state.venue.value) ? [
      {
        date: this.state.date,
        start_time: `${this.state.startTime}:00`,
        end_time: `${this.state.endTime}:00`,
        outside_venue_name: this.state.venue.value
      }
    ] : [
      {
        date: this.state.date,
        start_time: `${this.state.startTime}:00`,
        end_time: `${this.state.endTime}:00`,
        venue: this.state.venue.value
      }
    ]

    const newTags = this.state.tags.filter(tag => tag.__isNew__);
    const oldTags = this.state.tags.filter(tag => !tag.__isNew__);

    localStorage.removeItem("tags");
    newTags.forEach(async tag => await this.props.postTag(tag.value));

    try {
      const tagsStorage = localStorage.getItem("tags");
      console.log(tagsStorage);

      const editedDetails = {
        name: this.state.name,
        audience: this.state.audience.value,
        description: this.state.description,
        tags: oldTags.map(tag => tag.value).concat(tagsStorage == null ? [] : tagsStorage.map(Number)),
        poster_url: this.state.posterUrl,
        hosts: this.state.hosts.map(host => host.value),
        event_logistics: logistics
      };
      console.log(editedDetails.tags);
      // TODO: Convert into action
      axios
        .put(`${process.env.REACT_APP_API_URL}/events/${this.props.eventId}/`, editedDetails)
        .then(response => {
          localStorage.removeItem("tags");
          // this.props.history.push("/dashboard");
        })
        .catch(error => {
          console.log(error);
          localStorage.removeItem("tags");
        });
    } catch(e) {
      console.log(e);
    }
  };

  render() {
    const handleInputChange = this.handleInputChange;

    return (
      <main>
        <NewEventForm onSubmit={this.handleSubmit}>
          <UploadArea>
            <label>
              <AppTextP>Upload an Image</AppTextP>
              <FileInputHidden
                type="file"
                accept="image/png, image/jpeg"
                onChange={this.handleFileUpload}
              />
              <UploadButton img={this.state.posterUrl}>
                <CameraIcon src={require("assets/camera.svg")} />
              </UploadButton>
            </label>
          </UploadArea>
          <TextInputArea>
            <NewEventFormTextInput
              label="Event Name"
              onChange={e => handleInputChange("name", e.target.value)}
              defaultValue={this.props.name}
              required
            />
            <NewEventFormAppInputAutocomplete
              label="Audience"
              placeholder=""
              isSearchable={true}
              options={this.props.audiences}
              onChange={value => handleInputChange("audience", value)}
              defaultValue={this.props.audience}
              required
            />
            <NewEventFormAppInputAutocomplete
              label="Hosts"
              placeholder=""
              isMulti={true}
              isSearchable={true}
              options={this.props.all_hosts}
              onChange={value => handleInputChange("hosts", value)}
              defaultValue={this.props.hosts}
            />
            <NewEventFormTextInput
              label="Date"
              type="date"
              min={format(new Date(), "YYYY-MM-DD")}
              onChange={e => handleInputChange("date", e.target.value)}
              defaultValue={this.props.date}
              required
            />
            <NewEventFormTextInput
              label="Start Time"
              type="time"
              onChange={e => handleInputChange("startTime", e.target.value)}
              required
              style={{
                width: "50%"
              }}
              defaultValue={this.props.start_time}
            />
            <NewEventFormTextInput
              label="End Time"
              type="time"
              onChange={e => handleInputChange("endTime", e.target.value)}
              required
              style={{
                width: "50%"
              }}
              defaultValue={this.props.end_time}
            />
            {/* TODO: Make field required */}
            <NewEventFormAppInputAutocomplete
              label="Venue"
              placeholder=""
              isCreatable={true}
              isSearchable={true}
              options={this.props.venues}
              onChange={value => handleInputChange("venue", value)}
              defaultValue={this.props.venue}
              required
            />
            <NewEventFormTextInput
              label="Event Description"
              onChange={e => handleInputChange("description", e.target.value)}
              multiline
              rows="4"
              defaultValue={this.props.description}
            />
            <NewEventFormAppInputAutocomplete
              label="Tags"
              placeholder=""
              isMulti={true}
              isSearchable={true}
              isCreatable={true}
              options={this.props.all_tags}
              onChange={value => handleInputChange("tags", value)}
              defaultValue={this.props.tags}
            />
            <AppButtonInput type="submit" value="Submit" />
            <AppButton empty>Cancel</AppButton>
          </TextInputArea>
        </NewEventForm>
      </main>
    );
  }
}

export default EventEdit;
