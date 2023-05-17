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
  TouchableHighlight,
  ActivityIndicator,
  Alert
} from "react-native";
import { Globalstyles } from "../styles/global";
import ProgressCircle from "react-native-progress-circle";
import { ProgressBar, Colors } from "react-native-paper";
import { ViewPropTypes } from "deprecated-react-native-prop-types";
import { SelectList } from "react-native-dropdown-select-list";
import { ScrollView } from "react-native";
import Card from "../components/recentCard";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

var fullWidth = Dimensions.get("window").width;
let globalusername = null;
let recentdata = [];

let totalProts; 

let currentProts; 
let totalCarbs; 
let totalFats;

let achProts;
let achFats;
let achCarbs;

let totalWeeklyCalories2
let achWeeklyCals2

let totalMonthlyCalories2
let achMonthlyCals2

const USRDASH = ({ navigation, route }) => {
  let globaldata = [];
  let globaldata1 = [];
  let weeklydata = [];

  const [email1, setEmail] = useState("");

  const [datax, setData] = useState({});
  const [datan, setDatan] = useState({});

  const [dataz, setDataz] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  var err = 0;
  const [prots, setProts] = useState(0.0);
  const [carbs, setCarbs] = useState(0.0);
  const [fats, setFats] = useState(0.0);
  const [achCalories, setAchCalories] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);

  const [achWeeklyCalories, setAchWeeklyCalories] = useState(0);
  const [totalWeeklyCalories, setTotalWeeklyCalories] = useState(0);

  const [achMonthlyCalories, setAchMonthlyCalories] = useState(0);
  const [totalMonthlyCalories, setTotalMonthlyCalories] = useState(0);

  const [dailyCalories, setDailyCalories] = useState(0.0);
  const [weeklyCalories, setWeeklyCalories] = useState(0.0);
  const [monthlyCalories, setMonthlyCalories] = useState(0.0);

  React.useEffect(() => {
    const getDataFromScreenA = async () => {
      try {
        const email = await AsyncStorage.getItem("dataKey");
        console.log("store: " + email);
        globalusername = email;
        axios
          .post(
            "http://192.168.18.102:3000/dashName",
            { email },
            { maxContentLength: 1000000 }
          )
          .then((response) => {
            if (response.data == "0") {
              setIsLoading(false);
              alert("Error!", "Try Again Later!");
              console.log("NO DATA FOUND " + response.data);
            }
            // setIsLoading(false);
            globaldata1 = [...response.data];
            // console.log(globaldata);

            myd1 = {
              ...globaldata1[0],
            };
            setDataz({
              ...globaldata1[0],
            });
          })
          .catch((error) => {
            // setIsLoading(false);
            alert("Network Error");
            console.log(error);
          });

        axios
          .post(
            "http://192.168.18.102:3000/recentmeals",
            { email },
            { maxContentLength: 1000000 }
          )
          .then((response) => {
            if (response.data == "0") {
              setIsLoading(false);
              // alert("Error!", "Try Again Later!");
              console.log("NO DATA FOUND " + response.data);
            }
            // setIsLoading(false);
            recentdata = [...response.data];
            console.log(recentdata);
          })
          .catch((error) => {
            // setIsLoading(false);
            // alert("Network Error");
            console.log(error);
          }); 

        axios
          .post(
            "http://192.168.18.102:3000/dailyCalories",
            { email },
            { maxContentLength: 1000000 }
          )
          .then((response) => {
            if (response.data == "0") {
              setIsLoading(false);
              // alert("Error!", "Try Again Later!");
              console.log("NO DATA FOUND " + response.data);
            }

            globaldata = [...response.data];

            myd = {
              ...globaldata[0],
            };
            setData(globaldata[0]);
            console.log(globaldata[0]);
            //Protein
             totalProts = globaldata[0].totalprots;
            // console.log("datax prots"+totalProts);
             achProts = globaldata[0].achprots;
            // const currentProts =0.0;
             currentProts = achProts / totalProts;

            //Carbs
            totalCarbs = globaldata[0].totalcarbs;
            achCarbs = globaldata[0].achcarbs;
            // const currentCarbs =0.0;
            const currentCarbs = achCarbs / totalCarbs;

            // Fats
            totalFats = globaldata[0].totalfats;
            achFats = globaldata[0].achfats;
            // const currentFats =0.0;
            const currentFats = achFats / totalFats;

            //Daliy Calories
            const totalCalories1 = globaldata[0].totalcals;
            const achCalories1 = globaldata[0].achcals;
            // const currentCalories = 0;
            const currentCalories = (achCalories1 / totalCalories1) * 100;

            totalWeeklyCalories2 =globaldata[0].totalweekly;
            achWeeklyCals2 =globaldata[0].achweekly;

            const currentWeeklyCalories = (achWeeklyCals2 / totalWeeklyCalories2) * 100;

            totalMonthlyCalories2 =globaldata[0].totalmonthly;
            achMonthlyCals2=globaldata[0].achmonthly;

            const currentMonthlyCalories = (achMonthlyCals2 / totalMonthlyCalories2) * 100;

            // console.log(currentMonthlyCalories);

            setProts(currentProts);
            setCarbs(currentCarbs);
            setFats(currentFats);
            setAchCalories(achCalories1);
            setTotalCalories(totalCalories1);

            setDailyCalories(currentCalories);

            setWeeklyCalories(currentWeeklyCalories);

            setAchWeeklyCalories(achWeeklyCals2);
            setTotalWeeklyCalories(totalWeeklyCalories2);

            setMonthlyCalories(currentMonthlyCalories);
            setAchMonthlyCalories(achMonthlyCals2);
            setTotalMonthlyCalories(totalMonthlyCalories2);

            // setIsLoading(false);
          })
          .catch((error) => {
            // setIsLoading(false);
            alert("Network Error");
            console.log(error);
          });

            

            
        setIsLoading(false);
      } catch (error) {
        console.log("Error retrieving data from AsyncStorage:", error);
      }
    };

    getDataFromScreenA();

    //name req
  }, []);
  React.useEffect(() => {}, []);

  // console.log('email:'+email1);
  // console.log("prots:" + prots);

  const [error, setError] = useState("");

  const [selected, setSelected] = React.useState("");

  const data = [
    { key: '270', value: 'Tandoori Chicken Karahi' },
    { key: '274', value: 'Chicken Biryani' },
    { key: '254', value: 'Cheese Omlette--2 Eggs, Shredded Cheese' },
    { key: '140', value: 'Homemade Brown- Whole Grains Roti - Roti' },
    { key: '155', value: 'Nestle - Milk Pak (Full Cream Milk)' },
    { key: '280', value: 'Eggs - Boiled Egg' },
    { key: '340', value: 'tesco - tikka chicken breast' },
    { key: '254', value: 'Omlette - Cheese Omlette--2 Eggs, Shredded Cheese' },
    { key: '59', value: 'Dawn - Bran bread' },
    { key: '60', value: 'Indian - Roti' },
    { key: '56', value: 'Zaanse Mayonaise - Mayonaise' },
    { key: '484', value: 'Home Made - Aloo Keema(Beef Mince With Diced Potato)' },
    { key: '386', value: 'Homemade - Keema Beef (Punjabi)' },
    { key: '218', value: 'Mango Shake Home Made - Mango Shake' },
    { key: '220', value: 'Kfc - Grilled Chicken Breast Piece' },
    { key: '154', value: 'Kfc - Fries, 0.5 Regular' },
    { key: '210', value: 'Banana, 2 medium' },
    { key: '128', value: 'Homemade - Raita' },
    { key: '34', value: 'Egg white, 2 large' },
    { key: '200', value: 'Heb Peanut Butter - Peanut Butter' },
    { key: '95', value: 'Stonefire - Tandoor Baked Naan' },
    { key: '484', value: 'Homemade - Keema Aloo' }
  ];

  const dataIng = [
    { key: '381', value: 'Cornstarch' },
    { key: '691', value: 'Nuts, pecans' },
    { key: '25', value: 'Eggplant, raw' },
    { key: '367', value: 'Teff, uncooked' },
    { key: '144', value: 'Sherbet, orange' },
    { key: '25', value: 'Cauliflower, raw' },
    { key: '42', value: 'Taro leaves, raw' },
    { key: '282', value: 'Lamb, raw, ground' },
    { key: '300', value: 'Cheese, camembert' },
    { key: '290', value: 'Vegetarian fillets' },
    { key: '25', value: 'PACE, Picante Sauce' },
    { key: '349', value: 'Goji berries, dried' },
    { key: '51', value: 'Mango nectar, canned' },
    { key: '407', value: 'Crackers, rusk toast' },
    { key: '215', value: 'Chicken, boiled, feet' },
    { key: '134', value: 'Quail, raw, meat only' },
    { key: '316', value: 'Pie, lemon, fried pies' },
    { key: '29', value: 'Peppers, raw, jalapeno' },
    { key: '148', value: 'Winged bean tuber, raw' },
    { key: '172', value: 'Salami, turkey, cooked' },
    { key: '57', value: 'Grapes, raw, muscadine' },
    { key: '182', value: 'Nuts, raw, ginkgo nuts' },
    { key: '272', value: 'Spices, ground, savory' },
    { key: '516', value: 'Candies, sesame crunch' },
    { key: '201', value: 'Cheese, low fat, cream' },
    { key: '25', value: 'PACE, Green Taco Sauce' },
    { key: '270', value: 'Syrup, Canadian, maple' },
    { key: '119', value: 'Ostrich, raw, top loin' },
    { key: '268', value: 'Chewing gum, sugarless' },
    { key: '673', value: 'Nuts, dried, pine nuts' },
    { key: '371', value: 'Pasta, unenriched, dry' },
    { key: '20', value: "McDONALD'S, Side Salad" },
    { key: '406', value: 'Cookies, Marie biscuit' },
    { key: '30', value: 'Broccoli, raw, chinese' },
    { key: '271', value: "McDONALD'S, Hash Brown" },
    { key: '68', value: 'Agave, raw (Southwest)' },
    { key: '103', value: 'Emu, raw, outside drum' },
    { key: '576', value: 'Nuts, dried, beechnuts' },
    { key: '283', value: 'Currants, dried, zante' },
    { key: '106', value: 'Lentils, raw, sprouted' },
    { key: '322', value: 'Gravy, mix, dry, onion' },
  { key: '316', value: 'Pie, fruit, fried pies' },
  { key: '384', value: 'Snacks, cakes, popcorn' },
  { key: '383', value: 'Snack, Mixed Berry Bar' },
  { key: '108', value: 'Fish, raw, sheepshead' },
  { key: '47', value: 'Babyfood, pear, juice' },
  { key: '43', value: 'Brussels sprouts, raw' },
  { key: '33', value: 'Broccoli raab, cooked' },
  { key: '876', value: 'Butter oil, anhydrous' },
  { key: '17', value: 'Chicory, raw, witloof' },
  { key: '424', value: 'KEEBLER, Waffle Cones' },
  { key: '424', value: 'KEEBLER, Waffle Bowls' },
  { key: '28', value: 'Broccoli, raw, leaves' },
  { key: '147', value: 'Durian, raw or frozen' },
  { key: '16', value: 'Tomatoes, raw, orange' },
  { key: '15', value: 'Tomatoes, raw, yellow' },
  { key: '410', value: 'Egg custards, dry mix' },
  { key: '428', value: 'Peanut flour, low fat' },
  { key: '116', value: 'Fish, smoked, haddock' },
  { key: '282', value: "DENNY'S, french fries" },
  { key: '203', value: 'Ground turkey, cooked' },
  { key: '461', value: 'MURRAY, Vanilla Wafer' },
  { key: '301', value: "WENDY'S, french fries" },
  { key: '313', value: 'Bread, toasted, wheat' },
  { key: '374', value: 'Danish pastry, cheese' },
  { key: '500', value: 'Nuts, glazed, walnuts' },
  { key: '331', value: 'Spices, garlic powder' },
  { key: '763', value: 'Oil, soybean lecithin' },
  { key: '322', value: 'Egg, fresh, raw, yolk' },
  { key: '103', value: 'Fireweed, raw, leaves' },
  { key: '147', value: 'Beef, pastrami, cured' },
  { key: '233', value: 'Frankfurter, meatless' },
  { key: '102', value: 'Emu, raw, flat fillet' },
  { key: '108', value: 'Emu, raw, inside drum' },
  { key: '216', value: 'Ice creams, chocolate' },
  { key: '522', value: 'Snacks, potato sticks' },
  { key: '36', value: 'USDA Commodity, salsa' },
  { key: '249', value: 'Figs, uncooked, dried' },
  { key: '133', value: 'Game meat, raw, horse' },
  { key: '261', value: 'Syrup, fruit flavored' },
  { key: '28', value: 'Broccoli, raw, stalks' },
  { key: '198', value: 'Cream, cultured, sour' },
  { key: '16', value: 'Gravy, canned, au jus' },
  { key: '264', value: "McDONALD'S, Hamburger" },
  { key: '352', value: 'Cheese, port de salut' },
  { key: '100', value: 'SILK Original Creamer' },
  { key: '133', value: 'SILK Hazelnut Creamer' },
  { key: '293', value: 'Soup, mix, dry, onion' },
  { key: '37', value: 'Mushrooms, raw, enoki' },
  { key: '517', value: 'Bacon and beef sticks' },
  { key: '425', value: 'Salami, pork, Italian' },
  { key: '427', value: 'Crackers, whole-wheat' },
  { key: '570', value: 'Peanuts, raw, spanish' },
  { key: '72', value: 'Hominy, white, canned' },
  { key: '102', value: 'Game meat, raw, moose' },
  { key: '62', value: 'Pears, red anjou, raw' },
  { key: '48', value: 'Horseradish, prepared' },
  { key: '146', value: 'Fish, raw, butterfish' },
  { key: '172', value: 'Lebanon bologna, beef' }
];
  
  
  const [menuInput, setMenuInput] = useState(null);
  const [ingredeientInput, setIngredeientInput] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);

  const [formData, setFormData] = useState({
    foodname: "",
    calories: "",
    carbs: "",
    proteins: "",
    fats: "",
    errors: {},
  });

  const [targetData, setTargetData] = useState({
    email: "",
    dailycals: "",
    weeklycals: "",
    monthlycals: "",
    dailycarbs: "",
    dailyprots: "",
    dailyfats: "",
  });

  const validateForm = () => {
    let errors = {};

    if (!formData.foodname) {
      errors.name = " Food name is required";
      err = err + 1;
    }
    if (!menuInput) {
      setError("Please select an option");
    } else if (!ingredeientInput) {
      setError("Please select an option");
    } else {
      setError("");
      // TODO: Submit form logic here
    }

    setFormData({ ...formData, errors });
  };
  const currentDate = new Date();

  // Format the date as desired
  const formattedDate = currentDate
    .toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .reverse()
    .join("-");

  // console.log('date: '+formattedDate);
  // console.log('global email:' +globalusername);
  const pressHandler = () => {
    // console.log(globalusername);

    let totalCalories1=parseInt(formData.calories)+parseInt(achCalories);
    let totalProteins1=parseInt(formData.proteins)+parseInt(achProts);
    let totalCarbs1=parseInt(formData.carbs)+parseInt(achCarbs);
    let totalFats1=parseInt(formData.fats)+parseInt(achFats);
    let achweeklyy = parseInt(formData.calories)+parseInt(achWeeklyCals2);
    let achmonthlyy = parseInt(formData.calories)+parseInt(achMonthlyCals2);
    // console.log(achmonthlyy);
    if (err == 0) {
      const data1 = {
        'email': globalusername,
        'achcals': totalCalories1,
        'achprots': totalProteins1,
        'achcarbs': totalCarbs1,
        'achfats': totalFats1,
        'date': formattedDate,
        'achweekly':achweeklyy,
        'achmonthly':achmonthlyy,
      };
      console.log(data1);
      
      axios
      .post("http://192.168.18.102:3000/addcurrentcals", { data1 })
      .then((response) => {
        // console.log(response);
        // navigation.navigate("Signin",{signupData});
        setModalVisible(false);
        Alert.alert(
          "Calories Added",
      
        );
       
      })

      .catch((error) => {
        Alert.alert(
          "Server Error",
          // "This is the alert message.",
        );
        console.log(error);
      });

    }
    
  }
  const recentSubmit = () => {
    if (err == 0) {
      const data = {
        'email': globalusername,
        'foodname': formData.foodname,
        'calories': formData.calories,
      };
      axios
      .post("http://192.168.18.102:3000/addrecentmeals", { data })
      .then((response) => {
        // console.log(response);
        // navigation.navigate("Signin",{signupData});
        setModalVisible1(false);
        Alert.alert(
          "Calories Added",

        );
        console.log('recent'+data);
      })
      .catch((error) => {
        Alert.alert(
          "Server Error",

        );
        console.log(error);
      });


      
    }
  }

  const handleSubmit = () => {
    if (err == 0) {

      let targetWeekCals=parseInt(targetData.dailycals)*7;
      let targetMonthCals=parseInt(targetData.dailycals)*30;

      // console.log(targetMonthCals);
      
      
      const data2 = {
        'email': globalusername,
        'totalcals': targetData.dailycals,
        'totalprots': targetData.dailyprots,
        'totalcarbs': targetData.dailycarbs,
        'totalfats': targetData.dailyfats,
        'date': formattedDate,
        'targweeklycal':targetWeekCals,
        'targetmonthlycal':targetMonthCals
      };
      // console.log(data2);
      axios
        .post("http://192.168.18.102:3000/addcalories", { data2 })
        .then((response) => {
          // console.log(response);
          // navigation.navigate("Signin",{signupData});
          setModalVisible1(false);
          Alert.alert(
            "Calories Added",

          );
          console.log(data2);
        })
        .catch((error) => {
          Alert.alert(
            "Server Error",

          );
          console.log(error);
        });
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!isLoading) {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={styles.welcome}>
              <Text style={styles.welcText}>Good day, {dataz.name}</Text>
            </View>

            <View style={styles.container1}>
              <View style={styles.Circle}>
                <ProgressCircle
                  percent={weeklyCalories}
                  radius={50}
                  borderWidth={10}
                  color="#4CBB17"
                  shadowColor="#355E3B"
                  bgColor="#161416"
                >
                  <Text style={styles.prog1Text}>
                    {achWeeklyCalories + "/"}
                  </Text>
                  <Text style={styles.prog1Text}>{totalWeeklyCalories}</Text>
                  <Text style={styles.tot1Text}>{"Kcal"}</Text>
                </ProgressCircle>
                <Text style={styles.prog2Text}>Weekly</Text>
              </View>
              <View style={styles.Circle}>
                <ProgressCircle
                  percent={dailyCalories}
                  radius={80}
                  borderWidth={15}
                  color="#4CBB17"
                  shadowColor="#355E3B"
                  bgColor="#161416"
                >
                  <Text style={styles.progText}>{achCalories + "/"}</Text>
                  <Text style={styles.progText}>{totalCalories}</Text>
                  <Text style={styles.totText}>{"Kcal"}</Text>
                </ProgressCircle>
                <Text style={styles.prog3Text}>Today</Text>
              </View>
              <View style={styles.Circle1}>
                <ProgressCircle
                  percent={monthlyCalories}
                  radius={50}
                  borderWidth={10}
                  color="#4CBB17"
                  shadowColor="#355E3B"
                  bgColor="#161416"
                >
                  <Text style={styles.prog1Text}>{achMonthlyCalories + "/"}</Text>
                  <Text style={styles.prog1Text}>{totalMonthlyCalories}</Text>
                  <Text style={styles.tot1Text}>{"Kcal"}</Text>
                </ProgressCircle>
                <Text style={styles.prog2Text}>Monthly</Text>
              </View>
            </View>

            <View style={styles.leg}>
              <Text style={styles.legText}>{"Protein:"}</Text>
              <ProgressBar
                style={[styles.bar, { backgroundColor: "#5F9EA0" }]}
                progress={prots}
                color="#0047AB"
              />

              <Text style={styles.legText}>{"Carbs:"}</Text>
              <ProgressBar
                style={[styles.bar, { backgroundColor: "#F88379" }]}
                progress={carbs}
                color="#D2042D"
              />

              <Text style={styles.legText}>{"Fat:"}</Text>
              <ProgressBar
                style={[styles.bar, { backgroundColor: "#FFFF8F" }]}
                progress={fats}
                color="#FFEA00"
              />
            </View>
            {/* Set Cal Modal */}
            <Modal
              style={styles.modal}
              visible={modalVisible1}
              transparent={true}
              animationType="slide"
              onRequestClose={() => {
                setModalVisible1(false);
              }}
            >
              <View style={styles.addCAL}>
                <Pressable
                  onPress={() => {
                    setModalVisible1(false);
                    // navigation.navigate('calorie')
                  }}
                >
                  <Image
                    source={require("../assets/close.png")}
                    style={styles.image}
                  ></Image>
                </Pressable>
                <Text style={styles.addcalText}>
                  Set Your Targeted Calories
                </Text>
                <TextInput
                  style={styles.input1}
                  placeholder="Enter Daily targeted Calories (g)"
                  value={targetData.dailycals}
                  keyboardType="numeric"
                  onChangeText={(text) =>
                    setTargetData({ ...targetData, dailycals: text })
                  }
                ></TextInput>

                <TextInput
                  style={styles.input1}
                  placeholder="Enter Daily targeted Proteins (g)"
                  value={targetData.dailyprots}
                  keyboardType="numeric"
                  onChangeText={(text) =>
                    setTargetData({ ...targetData, dailyprots: text })
                  }
                ></TextInput>

                <TextInput
                  style={styles.input1}
                  placeholder="Enter Daily targeted Carbs (g)"
                  value={targetData.dailycarbs}
                  keyboardType="numeric"
                  onChangeText={(text) =>
                    setTargetData({ ...targetData, dailycarbs: text })
                  }
                ></TextInput>

                <TextInput
                  style={styles.input1}
                  placeholder="Enter Daily targeted Fats (g)"
                  value={targetData.dailyfats}
                  keyboardType="numeric"
                  onChangeText={(text) =>
                    setTargetData({ ...targetData, dailyfats: text })
                  }
                ></TextInput>

                <View style={styles.buttonDisplay}>
                  <Pressable style={styles.modalButton} onPress={handleSubmit}>
                    <Text style={styles.modalbuttonText}>Add</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>

            {/* Meal modal */}
         
              <Modal
              style={styles.modal}
              visible={modalVisible}
              transparent={true}
              animationType="slide"
              onRequestClose={() => {
                setModalVisible(false);
              }}
            >
                 <ScrollView>
              <View style={styles.addCAL}>
                <Pressable
                  onPress={() => {
                    setModalVisible(false);
                    // navigation.navigate('calorie')
                  }}
                >
                  <Image
                    source={require("../assets/close.png")}
                    style={styles.image}
                  ></Image>
                </Pressable>
                <Text style={styles.addcalText}> Add Calories By Menu</Text>
                <SelectList
                  setSelected={(menuInput) => setMenuInput(menuInput)}
                  data={data}
                  save="key"
                  boxStyles={[{ marginHorizontal: 20 }]}
                  TextStyles={{ color: "#FFF" }}
                  dropdownStyles={[{ marginHorizontal: 20 }]}
                  // dropdownTextStyles={{color:'#FFF'}}
                  maxHeight={150}
                />
                {error ? (
                  <Text style={Globalstyles.errortext}>{error}</Text>
                ) : null}
                <Text style={styles.addcalText}>
                  {" "}
                  Add Calories By Ingredients
                </Text>
                <SelectList
                  setSelected={(ingredeientInput) =>
                    setIngredeientInput(ingredeientInput)
                  }
                  data={dataIng}
                  save="key"
                  boxStyles={[{ marginHorizontal: 20 }]}
                  TextStyles={{ color: "#FFF" }}
                  dropdownStyles={[{ marginHorizontal: 20 }]}
                  // dropdownTextStyles={{color:'#FFF'}}
                  maxHeight={150}
                />
                {error ? (
                  <Text style={Globalstyles.errortext}>{error}</Text>
                ) : null}
                <Text style={styles.addcalText}> Add Calories Manually</Text>
                <TextInput
                  style={styles.input1}
                  placeholder="Enter food name"
                  value={formData.foodname}
                  onChangeText={(text) =>
                    setFormData({ ...formData, foodname: text })
                  }
                ></TextInput>
                {formData.errors.foodname && (
                  <Text style={Globalstyles.errortext}>
                    {formData.errors.foodname}
                  </Text>
                )}

                <TextInput
                  style={styles.input1}
                  placeholder="Enter Calories (g)"
                  keyboardType="numeric"
                  value={formData.calories}
                  onChangeText={(text) =>
                    setFormData({ ...formData, calories: text })
                  }
                ></TextInput>

                <TextInput
                  style={styles.input1}
                  placeholder="Enter Carbs (g)"
                  keyboardType="numeric"
                  value={formData.carbs}
                  onChangeText={(text) =>
                    setFormData({ ...formData, carbs: text })
                  }
                ></TextInput>

                <TextInput
                  style={styles.input1}
                  placeholder="Enter Fats (g)"
                  keyboardType="numeric"
                  value={formData.fats}
                  onChangeText={(text) =>
                    setFormData({ ...formData, fats: text })
                  }
                ></TextInput>

                <TextInput
                  style={styles.input1}
                  placeholder="Enter Proteins (g)"
                  keyboardType="numeric"
                  value={formData.proteins}
                  onChangeText={(text) =>
                    setFormData({ ...formData, proteins: text })
                  }
                ></TextInput>
                <View style={styles.buttonDisplay}>
                  <Pressable style={styles.modalButton} onPress={pressHandler} onPressOut={recentSubmit} >
                    <Text style={styles.modalbuttonText}>Update</Text>
                  </Pressable>
                </View>
              </View>
              </ScrollView>
            </Modal>
         


            <View style={styles.recent}>
              <Text style={styles.reText}>Recent Meals</Text>

              {recentdata.map((item) => (
                <Card key={item.foodname} data={item} navigation={navigation} />
              ))}
            </View>
            <View style={styles.buttonDisplay}>
              <Pressable
                style={styles.mealButton}
                onPress={() => {
                  setModalVisible(true);
                }}
              >
                <Text style={Globalstyles.buttonText}>Add meal</Text>
              </Pressable>

              <Pressable
                style={styles.mealButton}
                onPress={() => {
                  setModalVisible1(true);
                }}
              >
                <Text style={Globalstyles.buttonText}>Set Targets</Text>
              </Pressable>
            </View>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161416",

    // justifyContent:'center',
  },
  modal: {
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#CCC",
    flexWrap: "nowrap",
    backgroundColor: "#E8EBE8",
    shadowColor: "#000",
    shadowOffset: {
      width: -2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.5,
    elevation: 3,
    overflow: "scroll",
    marginHorizontal: 20,
  },
  addCAL: {
    // marginTop: 20,
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#CCC",
    flexWrap: "nowrap",
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: {
      width: -2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.5,
    elevation: 3,
    overflow: "scroll",
    marginHorizontal: 20,
  },
  recent: {
    marginHorizontal: 20,
  },
  input1: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    width: 330,
    height: 45,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  addcalText: {
    marginVertical: 10,
    marginLeft: 20,
    fontSize: 14,
    fontWeight: "500",
  },
  reText: {
    marginVertical: 10,
    // marginLeft: 20,
    fontSize: 18,
    fontWeight: "500",
    color: "#d4dce4",
  },
  container1: {
    alignItems: "center",
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  Circle: {
    alignItems: "center",
    // marginTop: 30,
    marginHorizontal: 5,
    // flexDirection: "row",
    justifyContent: "center",
  },
  Circle1: {
    alignItems: "center",
    // marginTop: 30,
    marginHorizontal: 5,
    // flexDirection: "row",
    justifyContent: "center",
  },
  calendar: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: fullWidth,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#161416",
  },
  image: {
    height: 20,
    width: 20,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  calText: {
    fontSize: 22,
    fontWeight: "400",
    color: "#228B22",
    marginLeft: 5,
  },
  calText1: {
    fontSize: 22,
    fontWeight: "400",
    color: "#228B22",
    marginLeft: 2,
  },
  progText: {
    fontSize: 24,
    color: "#FFF",
    fontWeight: "bold",
  },
  prog1Text: {
    fontSize: 14,
    color: "#FFF",
    fontWeight: "bold",
  },
  prog3Text: {
    fontSize: 24,
    color: "#FFF",
    fontWeight: "bold",
    marginTop: 10,
  },
  prog2Text: {
    fontSize: 14,
    color: "#FFF",
    fontWeight: "bold",
    marginTop: 10,
  },

  welcText: {
    fontSize: 20,
    color: "#FFF",
    fontWeight: "600",
    marginHorizontal: 20,
    marginTop: 40,
  },
  welcome: {
    alignItems: "flex-start",
    justifyContent: "center",
  },
  totText: {
    fontSize: 24,
    color: "#707B7C",
    fontWeight: "600",
  },
  tot1Text: {
    fontSize: 14,
    color: "#707B7C",
    fontWeight: "600",
  },
  leg: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 10,
    marginLeft: 20,
  },
  legText: {
    fontSize: 18,
    color: "#d4dce4",
    fontWeight: "400",
    paddingBottom: 5,
    paddingTop: 5,
  },
  bar: {
    width: 370,
    height: 10,
    borderWidth: 0.5,
    borderRadius: 100,
  },
  button: {
    // marginTop:20,
    alignItems: "center",
    justifyContent: "center",
    // paddingVertical: 12,
    // paddingHorizontal: 32,
    borderRadius: 6,
    borderColor: "white",
    borderWidth: 0,
    width: 120,
    height: 45,
    elevation: 3,
    backgroundColor: "#083444",
    // marginBottom:5,
  },
  mealButton: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingVertical: 12,
    borderRadius: 6,
    borderColor: "white",
    borderWidth: 2,
    width: 170,
    elevation: 3,
    backgroundColor: "#FFF",
    marginBottom: 120,
    marginHorizontal: 20,
  },
  button1: {
    // marginTop:20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    borderColor: "white",
    borderWidth: 0,
    width: 120,
    height: 45,
    elevation: 3,
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: "500",
    letterSpacing: 0.25,
    color: "#FFF",
  },
  buttonDisplay: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  submitButton: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 6,
    borderColor: "white",
    borderWidth: 2,
    width: 300,
    elevation: 3,
    backgroundColor: "#FFF",
    marginBottom: 20,
    marginHorizontal: 20,
  },
  modalButton: {
    alignItems: "center",
    justifyContent: "flex-end",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 6,
    borderColor: "#161416",
    borderWidth: 2,
    width: 150,
    elevation: 3,
    backgroundColor: "#161416",
    marginBottom: 20,
    marginHorizontal: 20,
  },
  modalbuttonText: {
    fontSize: 22,
    lineHeight: 21,
    fontWeight: "400",
    letterSpacing: 0.25,
    color: "#FFF",
  },
});
export default USRDASH;
