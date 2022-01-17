import React, { Component } from "react";
import { firebase } from '../../firebase';
import FileUploader from 'react-firebase-file-uploader';

class Uploader extends Component {
    
    state = {
        fileName: '',
        isUploading: false,
        progress: 0,
        fileURL: '',
    }

    render () {
        return (
            <div>
                <FileUploader
                    accept='image/*'
                    name="image"
                    randomizeFilename
                    storageRef={firebase.storage().ref('images')}
                    onUploadStart={this.handleUploadStart}
                    onUploadError={this.handleUploadError}
                    onUploadSuccess={this.handleUploadSuccess}
                    onProgress={this.handleProgress}
                />
            </div>
        )
    }
}

export default Uploader;