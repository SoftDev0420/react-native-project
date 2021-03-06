import React, { Component } from "react";
import { View, Image } from "react-native";
import NavigationButton from "src/components/navigation-button/NavigationButton";

const pathbase =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000/"
    : "http://ns327841.ip-37-187-112.eu/static/media/";
class Uploads extends Component {
  constructor(props) {
    super(props);
    this.uploads = [];
    this.state = {
      file: null,
      url: null
    };
  }
  openImagePicker = e => {
    this.props.handleUpload(this.state.file).then(({ data }) => {
      if (data) return this.props.saveUp(data.singleUpload, undefined);
    });
  };
  onChangeFile = e => {
    // generate a new FileReader object
    var reader = new FileReader();
    if (e.target.validity.valid) {
      const file = e.target.files[0];
      console.log("handleUploadfile", file);
      // inject an image with the src url
      reader.onload = event => {
        console.log("handleUploadurl", event.target);
        this.setState({ url: event.target.result, file });
      };
      // when the file is read it triggers the onload event above.
      reader.readAsDataURL(file);
    }
  };
  componentWillMount() {
    console.log("componentWillMount");
    this.uploads = [];
  }
  componentWillReceiveProps(newprops, state) {
    console.log("componentWillReceiveProps", newprops, this.uploads);
    const { data } = newprops;
    //if (!data.loading) {
    if (data && data.uploads && data.uploads.length !== this.uploads.length) {
      this.uploads = data.uploads;
      this.props.saveUp({}, this.uploads);
    }
    // }
  }
  componentDidMount() {
    const { data } = this.props;
    console.log("componentDidMount");
    if (data && data.uploads) this.props.saveUp({}, data.uploads);
  }
  render() {
    const { data, preview } = this.props;
    let datas;
    console.log("updateUpload");
    //const selected = this.state.selected;
    if (data) {
      console.log("uploads", data.uploads, this.props);
      //  const pictures = (!!this.state.fetched_list.length) ? this.state.fetched_list : data.allPictures;
      this.datas = data.uploads;
    }

    return (
      <View>
        {this.props.content}
        <NavigationButton
          enabled={this.state.file}
          text="Upload"
          onPress={this.openImagePicker}
        />
        <input type="file" onChange={this.onChangeFile} />
        {(this.state.url || this.props.preview.path) && (
          <Image
            style={{
              width: 300,
              height: 300,
              resizeMode: Image.resizeMode.contain,
              borderWidth: 1,
              borderColor: "red"
            }}
            source={
              this.state.url
                ? { uri: this.state.url }
                : { uri: pathbase + this.props.preview.path }
            }
            alt="input"
          />
        )}
      </View>
    );
  }
}
//
Uploads.propTypes = {};
Uploads.defaultProps = {};

export default Uploads;

//require("../../../uploads/" + this.props.preview.path)
