import React, { PureComponent } from 'react';
import { TextInput, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const data = {
  customerType: 'business', // business / private
  billingCompany: 'T_Company', billingDepartment: 'T_Department', billingVatId: 'T_VatID',
  salutation: 'Herr', firstname: 'T_FirstName', lastname: 'T_LastName', phone: '+38(050)1112233', birthday: '1999-10-01',
  billingStreet: 'T_Street', billingZipcode: 'T_ZipCode', billingCity: 'T_City', billingCountry: 2, newsletterSubscribe: 1,
  password: '11111111',
}

// const photo = {
//   fileName: 'TEST.png', type: 'image/png', fileSize: 63780,
//   width: 210, height: 118, isVertical: true, originalRotation: 0,
//   path: 'file:///storage/emulated/0/Pictures/TEST.png',
//   uri: 'content://com.google.android.apps.photos.contentprovider/-1/1/content://media/external/images/media/22/ORIGINAL/NONE/565507547'
// }

export default class TestRegister extends PureComponent {
  static navigationOptions = { title: 'Anmeldung' }
  state = { email: '', photo: null }

  Registration(email) {
    console.log('Registration => email:', email);
    // this.RequestBody(email);
    this.RequestBody4(email);
    // this.RequestBody1(email);
    // this.RequestBody2(email);
    // this.RequestBody3(email);
  }

  RequestBody3(email) {
    /*
    const {
      customerType, billingCompany, billingDepartment, billingVatId,
      salutation, firstname, lastname, phone, birthday,
      password, billingStreet, billingZipcode, billingCity, billingCountry, newsletterSubscribe
    } = data;

    let requestBody = `customerType=${customerType}&billingCompany=${billingCompany}&billingDepartment=${billingDepartment}&billingVatId=${billingVatId}&salutation=${salutation}&firstname=${firstname}&lastname=${lastname}&phone=${phone}&birthday=${birthday}&email=${email}&password=${password}&billingStreet=${billingStreet}&billingZipcode=${billingZipcode}&billingCity=${billingCity}&billingCountry=${billingCountry}&newsletterSubscribe=${newsletterSubscribe}`;

    const image = { name: photo.fileName, uri: `file://${photo.path}`, type: photo.type }

    // const requestPhoto = `photo=${JSON.stringify(image)}`;
    const requestPhoto = `photo[0][name]='${image.name}'&photo[0][uri]='${image.uri}'&photo[0][type]='${image.type}'`;

    requestBody += `&${requestPhoto}`;
    console.log('BuildRequestBody => requestBody:', requestBody);

    registerRequest(requestBody);
    */
  }

  RequestBody2(email) {
    /*
    var fd = new FormData();
    if (photo) {
      const path = 'file:/' + photo.path;
      const uri = decodeURIComponent(photo.uri);
      const image = {
        fileName: photo.fileName,
        fileSize: photo.fileSize,
        height: photo.height,
        isVertical: photo.isVertical,
        originalRotation: photo.originalRotation,
        path: photo.path,
        type: photo.type,
        uri: Platform.OS === "android" ? uri : uri.replace("file://", ""),
        width: photo.width
      }
      // fd.append("photo", image);
      fd.append("photo", { uri : image.uri, type: image.type, name: image.fileName });
    }

    for (let key in data) {
      if (typeof(data[key]) == "object") {
        for (let n in data[key]) {
          if (typeof(data[key][n]) == "object") {
            for (let k in data[key][n]) {
              fd.append(''+key+'['+n+']['+k+']', data[key][n][k]);
            }
          } else {
            fd.append(''+key+'['+n+']', data[key][n]);
          }
        }
      } else {
        fd.append(key, data[key]);
      }
    }

    console.log('BuildRequestBody => FormData:', fd);
    */
  }

  RequestBody1(email) {
    /*
    const boundary = String(Math.random()).slice(2);
    const boundaryMiddle = '--' + boundary + '\r\n';
    const boundaryLast = '--' + boundary + '--\r\n';

    let body = ['\r\n'];
    for (let key in data) {
      body.push(`Content-Disposition: form-data; name="${key}"\r\n\r\n${data[key]}\r\n`);
    }
    console.log('BuildFormData => body:', body);

    const fileName = img.name.replace(img.name.slice(img.name.length-4),'');
    const fileBody1 = `Content-Disposition: form-data; name="${fileName}"; filename="${img.name}"\r\n`;
    body.push(fileBody1);
    const fileBody2 = `Content-Type: ${img.type}\r\n\r\n`;
    body.push(fileBody2);

    const fd = new FormData();
    if (photo) {
      fd.append("photo", {
        name: photo.fileName,
        type: photo.type,
        uri: Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
      });
    }
    Object.keys(data).forEach(key => fd.append(key, data[key]));

    const decodeUri = decodeURIComponent(photo.uri);
    console.log('BuildFormData => decodeUri:', decodeUri);
    const filePath = 'file://storage/emulated/0/Pictures/TEST.png';

    // fetch(decodeUri).then(response => {
    fetch(filePath).then(response => {
      console.log('BuildFormData => response:', response);
      response.blob();
    }).then(content => {
      console.log('BuildFormData => fileSize:', content.size);
    });

    // const content = decodeUri;
    const content = filePath;
    let reader = new FileReader();
    reader.addEventListener("loadend", function () {
      formData = new FormData();
      formData.append("content", reader.result);
      console.log('BuildFormData => response:', reader);
      console.log('BuildFormData => formData:', formData);

      // fetch("https://wiki.epfl.ch/test.php", { method: 'POST', body: formData }).then(res => {
      //   console.log('BuildFormData => response:', res);
      // });
      reader.removeEventListener("loadend");
    });
    reader.readAsDataURL(content);

    // const response = await fetch(photo.path);
    // console.log('BuildFormData => response:', response);
    // const content = await response.blob();
    // console.log('BuildFormData => fileSize:', content.size);
    // fetch("https://wiki.epfl.ch/test.php", { method: 'POST', body: content });
    // body = body.join(boundaryMiddle) + boundaryLast;
    // console.log('BuildFormData => body:', body);

    // Тело запроса готово, отправляем
    // Content-Disposition: form-data; name="myfile"; filename="pic.jpg"
    // Content-Type: image/jpeg
    // (пустая строка)
    // содержимое файла
*/
  }

  RequestBody4(email) {
    const apiUrl = 'https://teleropa.de/WebiProgCommunicationApplicationUser/register';
    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));
    formData.append('email', email);

    const photo = {
      name: this.state.photo.fileName,
      // uri: decodeURIComponent(this.state.photo.uri),
      // uri: this.state.photo.path,
      uri: 'file://'+this.state.photo.path,
      type: this.state.photo.type
    }

    formData.append('photo', photo);

    console.log('RequestBody4 => formData:', formData);

    let xhr = new XMLHttpRequest();
    xhr.open('POST', apiUrl, true);

    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'multipart/form-data');
    xhr.onreadystatechange = function() {
      console.log('XMLHttpRequest => response:', this.response);
      console.log('XMLHttpRequest => readyState:', this.readyState);
      if (this.readyState != 4) return;
      console.log('XMLHttpRequest => responseText:', this.responseText);
    }
    xhr.send(formData);
  }

  RequestBody(email) {
    /*
    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));
    formData.append('email', email);

    // const { fileName, path, uri, type } = photo;
    const fileName = 'TEST.png';
    const type = 'image/png';

    // const uri = 'file:///storage/emulated/0/Pictures/TEST.png';
    const uri = '/storage/emulated/0/Pictures/TEST.png';

    // const uri = 'content://com.google.android.apps.photos.contentprovider/-1/1/content://media/external/images/media/22/ORIGINAL/NONE/565507547';
    // const uri = 'content://com.google.android.apps.photos.contentprovider/-1/1/';
    // const uri = 'content://media/external/images/media/22/ORIGINAL/NONE/565507547';

    // const uri = 'content://com.google.android.apps.photos.contentprovider/-1/1/content://media/external/images/media/22/ORIGINAL/NONE/565507547/storage/emulated/0/Pictures/TEST.png';
    // const uri = 'content://com.google.android.apps.photos.contentprovider/-1/1/storage/emulated/0/Pictures/TEST.png';
    // const uri = 'content://media/external/images/media/22/ORIGINAL/NONE/565507547/storage/emulated/0/Pictures/TEST.png';

    formData.append('photo', { name: fileName, uri: uri, type: type });

    console.log('Registration => formData:', formData);

    // console.log('Registration => JSON.stringify(formData):', JSON.stringify(formData));

    fetch('https://teleropa.de/WebiProgCommunicationApplicationUser/register', {
      method: 'POST',
      // headers: { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
      // headers: { Accept: 'application/json', 'Content-Type': 'multipart/form-data' },
      headers: { Accept: 'application/json' },
      body: formData
      // body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(({success, data, status}) => {
      if (success) {
        console.log('Register => success => id:', data.id, ' location:', data.location);
      } else {
        console.log('Register =>', status.code, ':', status.text);
      }
    });
    */
  }

  // -------------------------------------------------------------------------------------------

  PhotoRender() {
    const { photo } = this.state;
    const FileImage = photo ? (
      <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 5 }}>
        <Image source={{ uri: photo.uri }} style={{ width: 100, height: 100 }}/>
      </View>
    ) : <></>;
    const FileInfo = photo ? (
      <>
        <View style={s.Record}>
          <Text style={s.Head}>File:</Text>
          <Text style={s.Head2}>{photo.fileName}   #   {photo.type}</Text>
        </View>
        <View style={s.Record}>
          <Text style={s.Head}>Path:</Text><Text style={s.Text}>{photo.path}</Text>
        </View>
        <View style={s.Record}>
          <Text style={s.Head}>URI:</Text><Text style={s.Text}>{decodeURIComponent(photo.uri)}</Text>
        </View>
      </>
    ) : <></>;

    return (
      <View style={{flex: 0}}>
        {FileImage}
        {FileInfo}
        <View style={s.PhotoButton}>
          <TouchableOpacity onPress={() => this.ChoosePhoto()}>
            <Text style={s.licenseFileButtonText}>LOAD PHOTO</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  ChoosePhoto() {
    const options = { noData: true }
    ImagePicker.launchImageLibrary(options, response => {
      console.log('ChoosePhoto => response:', response);
      if (response.uri) {
        this.setState({ photo: response });
      }
    })
  }

  render() {
    // const email = 'tester2@gmail.com';
    const email = this.state.email;
    const {
      customerType, billingCompany, billingDepartment, billingVatId,
      salutation, firstname, lastname, phone, birthday,
      billingStreet, billingZipcode, billingCity, billingCountry, newsletterSubscribe,
      password
    } = data;
    // const { fileName, path, uri, type, fileSize, width, height } = this.state.photo;

    return (
      <View style={s.Container}>
				<ScrollView>
          <View style={s.Record}>
            <Text style={s.Head}>CustomerType:</Text><Text style={s.Text}>{customerType}</Text>
          </View>
          {/* <View style={s.Record}>
            <Text style={s.Head}>Company:</Text><Text style={s.Text}>{billingCompany}</Text>
          </View>
          <View style={s.Record}>
            <Text style={s.Head}>Department:</Text><Text style={s.Text}>{billingDepartment}</Text>
          </View>
          <View style={s.Record}>
            <Text style={s.Head}>VatID:</Text><Text style={s.Text}>{billingVatId}</Text>
          </View> */}
          <View style={s.Record}>
            <Text style={s.Head2}>{billingCompany}</Text>
            <Text style={s.Head2}>{billingDepartment}</Text>
            <Text style={s.Head2}>{billingVatId}</Text>
          </View>
          
          <View><Text style={s.Caption}>PHOTO</Text></View>
          {this.PhotoRender()}
          {/* <View style={s.Record}>
            <Text style={s.Head}>FileName:</Text><Text style={s.Text}>{fileName}</Text>
          </View>
          <View style={s.Record}>
            <Text style={s.Head}>Type:</Text><Text style={s.Text}>{type}</Text>
          </View>
          <View style={s.Record}>
            <Text style={s.Head}>Path:</Text><Text style={s.Text}>{path}</Text>
          </View>
          <View style={s.Record}>
            <Text style={s.Head}>URI:</Text><Text style={s.Text}>{uri}</Text>
          </View>
          <View style={s.Record}>
            <Text style={s.Head}>Details:</Text><Text style={s.Text}>{fileSize} byte / size: {width}x{height}</Text>
          </View> */}
          {/* <View style={s.Record}>
            <Text style={s.Head}>File:</Text>
            <Text style={s.Head2}>{fileName}   #   {type}</Text>
          </View>
          <View style={s.Record}>
            <Text style={s.Head}>Path:</Text><Text style={s.Text}>{path}</Text>
          </View>
          <View style={s.Record}>
            <Text style={s.Head}>URI:</Text><Text style={s.Text}>{uri}</Text>
          </View> */}

          <View><Text style={s.Caption}></Text></View>
          {/* <View style={s.Record}>
            <Text style={s.Head}>email:</Text><Text style={s.Text}>{email}</Text>
          </View>
          <View style={s.Record}>
            <Text style={s.Head}>password:</Text><Text style={s.Text}>{password}</Text>
          </View> */}
          <View style={s.Record}>
            <Text style={s.Head}>Account:</Text>
            <Text style={s.Text}>{this.state.email}  /  {password}</Text>
          </View>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <TextInput onChangeText={email => this.setState({ email })} value={this.state.email} style={s.EmailInput}/>
          </View>

          <View><Text style={s.Caption}></Text></View>
          {/* <View style={s.Record}>
            <Text style={s.Head}>Salutation:</Text><Text style={s.Text}>{salutation}</Text>
          </View>
          <View style={s.Record}>
            <Text style={s.Head}>FirstName:</Text><Text style={s.Text}>{firstname}</Text>
          </View>
          <View style={s.Record}>
            <Text style={s.Head}>LastName:</Text><Text style={s.Text}>{lastname}</Text>
          </View>
          <View style={s.Record}>
            <Text style={s.Head}>Phone:</Text><Text style={s.Text}>{phone}</Text>
          </View>
          <View style={s.Record}>
            <Text style={s.Head}>BirthDay:</Text><Text style={s.Text}>{birthday}</Text>
          </View>
          <View style={s.Record}>
            <Text style={s.Head}>Street:</Text><Text style={s.Text}>{billingStreet}</Text>
          </View>
          <View style={s.Record}>
            <Text style={s.Head}>Zipcode:</Text><Text style={s.Text}>{billingZipcode}</Text>
          </View>
          <View style={s.Record}>
            <Text style={s.Head}>City:</Text><Text style={s.Text}>{billingCity}</Text>
          </View>
          <View style={s.Record}>
            <Text style={s.Head}>Country:</Text><Text style={s.Text}>{billingCountry}</Text>
          </View>
          <View style={s.Record}>
            <Text style={s.Head}>Subscribe:</Text><Text style={s.Text}>{newsletterSubscribe}</Text>
          </View> */}
          <View style={s.Record}>
            <Text style={s.Head}>Name:</Text><Text style={s.Text}>{salutation} {firstname} {lastname}</Text>
          </View>
          <View style={s.Record}>
            <Text style={s.Text}>{phone}</Text><Text style={s.Text}>{birthday}</Text>
          </View>
          <View style={s.Record}>
            <Text style={s.Head}>Address:</Text>
            <Text style={s.Text}>{billingStreet}</Text>
            <Text style={s.Text}>{billingZipcode}</Text>
            <Text style={s.Text}>{billingCity}</Text>
          </View>
          <View style={s.Record}>
            <Text style={s.Head}>Country:</Text><Text style={s.Text}>{billingCountry}</Text>
            <Text style={s.Head}>Subscribe:</Text><Text style={s.Text}>{newsletterSubscribe}</Text>
          </View>
				</ScrollView>
        <View style={s.ExecuteButton}>
          <Text onPress={() => this.Registration(email)} style={s.ExecuteCaption}>EXECUTE</Text>
        </View>
      </View>
    )
  }
}

const s = StyleSheet.create({
  Head2: { flex: 1, fontSize: 15, fontWeight: 'bold', color: 'gray', flexWrap: 'wrap', paddingRight: 5 },

  Container: { flex: 1 },
  Caption: { fontSize: 18, fontWeight: 'bold', color: '#000000', padding: 0 },
  Record: { flexDirection: 'row', paddingVertical: 2, paddingHorizontal: 5 },
  Head: { fontSize: 15, color: '#000000', paddingRight: 5 },
  Text: { flex: 1, fontSize: 15, fontWeight: 'bold', color: 'gray', flexWrap: 'wrap' },
  ExecuteButton: { alignItems: 'center', justifyContent: 'center', padding: 0, marginTop: 20 },
  ExecuteCaption: {
    backgroundColor: 'green', color: '#FFFFFF', width: 150, height: 50,
    fontSize: 20, fontWeight: 'bold', textAlignVertical: 'center', textAlign: 'center',
    borderColor: '#000000', borderRadius: 10, alignItems: 'center', justifyContent: 'center',
  },

  EmailInput: {
    width: 320, height: 40, borderColor: 'gray', borderWidth: 1,
    fontSize: 18, fontWeight: 'bold', color: '#007BFF',
  },

  PhotoButton: {
    width: 150, height: 40, borderWidth: 1, borderColor: '#000000', borderRadius: 5, 
    flexDirection: 'row',
    alignSelf: 'center', justifyContent: 'center'
  },
  licenseFileButtonText: {
    textAlignVertical: 'center', fontSize: 16
  },
});
