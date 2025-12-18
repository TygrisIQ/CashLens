// import React, { useState, useEffect, useMemo } from 'react';
// import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
// import useTheme from '../shared/themeSelect';
// import useTransactions from '../../hooks/useTransactions';

// const { width } = Dimensions.get('window');

// export default function CalendarScreen() {
//   const { theme } = useTheme();
//   const { transactions } = useTransactions();

//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [selectedDate, setSelectedDate] = useState(
//     new Date().toISOString().split('T')[0]
//   );

//   useEffect(() => {
//     const y = currentDate.getFullYear();
//     const m = currentDate.getMonth() + 1;
//     setSelectedDate(`${y}-${String(m).padStart(2, '0')}-01`);
//   }, [currentDate]);

//   const { year, month, daysInMonth, firstDay } = useMemo(() => {
//     const y = currentDate.getFullYear();
//     const m = currentDate.getMonth();
//     return {
//       year: y,
//       month: m,
//       daysInMonth: new Date(y, m + 1, 0).getDate(),
//       firstDay: new Date(y, m, 1).getDay(),
//     };
//   }, [currentDate]);

//   const monthNames = [
//     'January','February','March','April','May','June',
//     'July','August','September','October','November','December'
//   ];

//   const getDayData = (day) => {
//     const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
//     const dayTxs = transactions.filter(t => t.date === dateStr);

//     const income = dayTxs
//       .filter(t => t.type === 'income')
//       .reduce((s, t) => s + t.amount, 0);

//     const expenses = dayTxs
//       .filter(t => t.type === 'expense')
//       .reduce((s, t) => s + t.amount, 0);

//     return {
//       dateStr,
//       txs: dayTxs,
//       income,
//       expenses,
//       net: income - expenses,
//     };
//   };

//   const selectedData = useMemo(() => {
//     if (!selectedDate) return null;
//     const day = parseInt(selectedDate.split('-')[2], 10);
//     return getDayData(day);
//   }, [selectedDate, transactions, currentDate]);

//   const renderDays = () => {
//     const days = [];

//     for (let i = 0; i < firstDay; i++) {
//       days.push(<View key={`e-${i}`} style={{ width: width / 8.5 }} />);
//     }

//     for (let d = 1; d <= daysInMonth; d++) {
//       const data = getDayData(d);
//       const isSelected = selectedDate === data.dateStr;
//       const hasActivity = data.txs.length > 0;

//       days.push(
//         <TouchableOpacity
//           key={d}
//           onPress={() => setSelectedDate(data.dateStr)}
//           style={{
//             width: width / 8.5,
//             height: 50,
//             alignItems: 'center',
//             justifyContent: 'center',
//             marginVertical: 4,
//             borderRadius: 12,
//             backgroundColor: isSelected ? theme.accent : 'transparent',
//           }}
//         >
//           <Text
//             style={{
//               color: isSelected ? '#fff' : theme.text,
//               fontWeight: isSelected ? '700' : '400',
//               fontSize: 16,
//             }}
//           >
//             {d}
//           </Text>

//           {hasActivity && !isSelected && (
//             <View
//               style={{
//                 width: 4,
//                 height: 4,
//                 borderRadius: 2,
//                 backgroundColor: data.net >= 0 ? '#2ecc71' : '#e74c3c',
//                 marginTop: 4,
//               }}
//             />
//           )}
//         </TouchableOpacity>
//       );
//     }

//     return days;
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: theme.background }}>
//       <View style={{ paddingHorizontal: 20, paddingTop: 60, paddingBottom: 20 }}>
//         <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
//           <View>
//             <Text style={{ color: theme.subtitle, fontSize: 16 }}>{year}</Text>
//             <Text style={{ color: theme.text, fontSize: 32, fontWeight: '800' }}>
//               {monthNames[month]}
//             </Text>
//           </View>

//           <View style={{ flexDirection: 'row' }}>
//             <NavBtn icon="‹" onPress={() => setCurrentDate(new Date(year, month - 1, 1))} theme={theme} />
//             <NavBtn icon="›" onPress={() => setCurrentDate(new Date(year, month + 1, 1))} theme={theme} />
//           </View>
//         </View>

//         <View
//           style={{
//             backgroundColor: theme.card,
//             borderRadius: 25,
//             padding: 15,
//             marginTop: 25,
//           }}
//         >
//           <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 15 }}>
//             {['S','M','T','W','T','F','S'].map((d, i) => (
//               <Text
//                 key={i}
//                 style={{
//                   color: theme.subtitle,
//                   fontWeight: '600',
//                   width: width / 8.5,
//                   textAlign: 'center',
//                 }}
//               >
//                 {d}
//               </Text>
//             ))}
//           </View>

//           <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
//             {renderDays()}
//           </View>
//         </View>
//       </View>

//       <View
//         style={{
//           flex: 1,
//           backgroundColor: theme.card,
//           borderTopLeftRadius: 35,
//           borderTopRightRadius: 35,
//           padding: 25,
//         }}
//       >
//         <Text style={{ color: theme.text, fontSize: 18, fontWeight: '700', marginBottom: 20 }}>
//           {selectedData?.txs.length ? 'Day Activity' : 'No Activity'}
//         </Text>

//         <ScrollView showsVerticalScrollIndicator={false}>
//           {selectedData?.txs.length ? (
//             selectedData.txs.map(t => (
//               <View
//                 key={t.id}
//                 style={{
//                   flexDirection: 'row',
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                   marginBottom: 15,
//                   backgroundColor: theme.background,
//                   padding: 15,
//                   borderRadius: 15,
//                 }}
//               >
//                 <View>
//                   <Text style={{ color: theme.text, fontWeight: '600' }}>
//                     {t.desc || 'Transaction'}
//                   </Text>
//                   <Text style={{ color: theme.subtitle, fontSize: 12 }}>
//                     {t.type}
//                   </Text>
//                 </View>

//                 <Text
//                   style={{
//                     color: t.type === 'income' ? '#2ecc71' : '#e74c3c',
//                     fontWeight: '700',
//                     fontSize: 16,
//                   }}
//                 >
//                   {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
//                 </Text>
//               </View>
//             ))
//           ) : (
//             <View style={{ alignItems: 'center', marginTop: 30 }}>
//               <Text style={{ color: theme.subtitle }}>
//                 Enjoy your day! No expenses recorded.
//               </Text>
//             </View>
//           )}
//         </ScrollView>

//         {selectedData && (
//           <View
//             style={{
//               flexDirection: 'row',
//               backgroundColor: theme.accent,
//               borderRadius: 20,
//               padding: 15,
//               justifyContent: 'space-around',
//               marginTop: 10,
//             }}
//           >
//             <SummaryItem label="Income" value={selectedData.income} />
//             <View style={{ width: 1, backgroundColor: 'rgba(255,255,255,0.2)' }} />
//             <SummaryItem label="Expense" value={selectedData.expenses} />
//           </View>
//         )}
//       </View>
//     </View>
//   );
// }

// function NavBtn({ icon, onPress, theme }) {
//   return (
//     <TouchableOpacity
//       onPress={onPress}
//       style={{
//         backgroundColor: theme.card,
//         width: 40,
//         height: 40,
//         borderRadius: 12,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginLeft: 10,
//       }}
//     >
//       <Text style={{ color: theme.text, fontSize: 20 }}>{icon}</Text>
//     </TouchableOpacity>
//   );
// }

// function SummaryItem({ label, value }) {
//   return (
//     <View style={{ alignItems: 'center' }}>
//       <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11 }}>
//         {label}
//       </Text>
//       <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>
//         ${value.toFixed(0)}
//       </Text>
//     </View>
//   );
// }
