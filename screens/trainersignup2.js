import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TextInput,
  Modal,
} from "react-native";
import { Globalstyles } from "../styles/global";
import { SelectList } from "react-native-dropdown-select-list";
import { useRoute } from "@react-navigation/native";

const TrainerSignup2 = ({ navigation }) => {

  const route = useRoute()
  const Formdata = route.params.formData
  console.log('data:'+Formdata);

  const newf = JSON.stringify(Formdata);
  console.log(newf);
  let jsonObject = JSON.parse(newf);

  let key = "name";
  let s1name = jsonObject[key];
  
  let key1 = "email";
  let s1email = jsonObject[key1];

  let key2 = "gender";
  let gen = jsonObject[key2];

  let key3 = "phone";
  let s1phone = jsonObject[key3];

  let key4 = "password";
  let s1pass = jsonObject[key4];



  var err = 0;
  const [selected, setSelected] = React.useState("");
  const [error, setError] = useState("");

  const validateForm = () => {
    let errors = {};

    if (!formData.name) {
      errors.name = "Name is required";
      err = err + 1;
    } else if (formData.name.length < 6) {
      errors.name = "Name must be at least 6 characters";
      err = err + 1;
    }

    if (!formData.email) {
      errors.email = "Email is required";
      err = err + 1;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid! It must have a special character.";
      err = err + 1;
    }
    if (!genderInput) {
      setError("Please select an option");
    } else {
      setError("");
      // TODO: Submit form logic here
    }
    if (!formData.phone) {
      errors.phone = "Phone number is required";
      err = err + 1;
    }
    if (!formData.password) {
      errors.password = "Password is required";
      err = err + 1;
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      err = err + 1;
    }
    setFormData({ ...formData, errors });
  };

  const handleSubmit = () => {
    // validateForm();
    if (err == 0) {
      const TsignupData ={
        'name': s1name,
        'email': s1email,
        'gender': gen,
        'password': s1pass,
        'phone': s1phone,
      }
      navigation.navigate("TrainerSignin", { TsignupData });
      console.log(TsignupData);
      // console.log(err);
    } else {
    }
  };
  const image = require('../assets/gallery.png')

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.signup}>
          {/* <Text style={styles.title}> Sign Up</Text> */}

        
          <Image style={styles.image} source={image}></Image>
            <Text style={styles.desc}>You can upload upto 8 pictures and 1 video</Text>

            <Pressable style={styles.uploadButton} onPress={''}>
            <Image source={require('../assets/addpic.png')}
                 style={styles.smimg}
                ></Image>
              <Text style={styles.uploadText}>Profile Picture</Text>
            </Pressable>

            <Pressable style={styles.uploadButton} onPress={''}>
            <Image source={require('../assets/image.png')}
                 style={styles.smimg}
                ></Image>
              <Text style={styles.uploadText}>Pictures</Text>
            </Pressable>

            <Pressable style={styles.uploadButton} onPress={''}>
                <Image source={require('../assets/film.png')}
                 style={styles.smimg}
                ></Image>
              <Text style={styles.uploadText}>Video</Text>
            </Pressable>

          <View style={styles.buttonDisplay}>
            <Pressable style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image:{
  
   height:150,
   width:150,
  },
  smimg:{
    height:25,
    width:25,
    marginRight:20
  },
  signup: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    letterSpacing: 0.25,
    color: "black",
    marginVertical: 20,
  },
  desc:{
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.25,
    color: "black",
    marginVertical: 20,
  },
  input1: {
    borderWidth: 1,
    borderColor: "#E8EBE8",
    backgroundColor: "#E8EBE8",
    color: "black",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    width: 330,
    height: 45,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  submitButton: {
    alignItems: "center",
    justifyContent: "flex-end",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 6,
    borderColor: "black",
    borderWidth: 2,
    width: 350,
    elevation: 3,
    backgroundColor: "black",
    marginBottom: 20,
    marginHorizontal: 20,
    marginTop: 30,
  },
  uploadButton: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection:'row',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 6,
    borderColor: "black",
    borderWidth: 5,
    width: 250,
    // elevation: 3,
    backgroundColor: "transparent",
    marginBottom: 20,
    marginHorizontal: 20,
    marginTop: 30,
  },
  uploadText: {
    fontSize: 22,
    lineHeight: 21,
    fontWeight: "400",
    letterSpacing: 0.25,
    color: "#000000",
  },

  buttonText: {
    fontSize: 22,
    lineHeight: 21,
    fontWeight: "400",
    letterSpacing: 0.25,
    color: "#FFF",
  },
  buttonDisplay: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TrainerSignup2;
