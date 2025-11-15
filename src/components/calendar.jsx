// import React from 'react';
// import { SafeAreaView, StyleSheet, Dimensions, Text, View, TouchableWithoutFeedback } from 'react-native';
// import moment from 'moment';
// import Swiper from 'react-native-swiper';

// const { width } = Dimensions.get('screen');

// export default function Calendar() {

//   const swiper = React.useRef();
//   const [value, setValue] = React.useState(new Date());
//   const [week, setWeek] = React.useState(0);

//   const weeks = React.useMemo(() => {
//     const start = moment(start).add(week, 'week').startOf('week');

//     return [-1, 0, 1].map(adj => {
//       return Array.from({ length: 7 }).map((_, index) => {
//         const date = moment(start).add(adj, 'week').add(index, 'day');

//         return {
//           weekday: date.format('ddd'),
//           date: date.toDate(),
//         };
//       });
//     });
//   }, [week]);

//   return (
//     <SafeAreaView style= {{flex: 1}}>
//       <View style={styles.container}>
//         <View style={styles.header}>
//           <Text style={styles.title}>Your Schedule</Text>
//         </View>

//         <View style={styles.picker}>
//           <Swiper index={1} ref={swiper} showsPagination={false} loop={false} onIndexChanged={ind => {
//             if (ind === 1) {
//               return;
//             }
//             setTimeout(() => {
//               const newIndex = ind - 1;
//               const newWeek = week + newIndex;
//               setWeek(newWeek);
//             }, 100);
//           }}>
//             {weeks.map((dates, index) => (
//               <View style={styles.itemRow} key={index}>
//                 {dates.map((item, dateIndex) => {
//                   const isActive = value.toDateString() === item.date.toDateString();

//                   return (
//                     <TouchableWithoutFeedback key={dateIndex} onPress={() => setValue(item.date)}>
//                       <View 
//                         style={{
//                           ...styles.item,
//                           ...(isActive && {backgroundColor: '#0f0095ff', borderColor: '#0f0095ff'})
//                         }}>
//                         <Text 
//                           style={{
//                             ...styles.itemWeekday,
//                             ...(isActive && {color: 'white'})
//                           }}>{item.weekday}
//                           </Text>
//                         <Text 
//                           style={{
//                             ...styles.itemDate,
//                             ...(isActive && {color: 'white'})
//                           }}>
//                             {item.date.getDate()}
//                         </Text>
//                       </View>
//                     </TouchableWithoutFeedback> 
//                   );
//                 })}
//               </View>
//             ))}
//           </Swiper>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingVertical: 16,
//   },
//   picker: {
//     flex: 1, 
//     alignItems: 'center', 
//     justifyContent: 'row',
//     paddingVertical: 12,
//     maxHeight: 74,
//   },
//   header: {
//     paddingHorizontal: 16,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#1d1d1d',
//     marginBottom: 12,
//   },
//   itemRow: {
//     width: 400,
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     justifyContent: 'space-between',
//     marginHorizontal: -4,
//   },
//   item: {
//     flex: 1,
//     height: 50,
//     marginHorizontal: 4,
//     alignItems: 'center',
//     borderRadius: 8,
//     paddingVertical: 6,
//     paddingHorizontal: 4,
//     borderWidth: 1,
//     borderColor: '#e3e3e3',
//     flexDirection: 'column',
//   },
//   itemWeekday: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#737373',
//     marginBottom: 4,
//   },
//   itemDate: {
//     fontSize: 15,
//     fontWeight: '600',
//     color: '#737373',
//   },
// });
