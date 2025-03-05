--- 
+++ 
@@ -1,33 +1,75 @@
 import React from 'react';
 import { NavigationContainer } from '@react-navigation/native';
+import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import { HomeScreen } from './src/screens/HomeScreen';
+import { ProfileScreen } from './src/screens/ProfileScreen';
 import { colors } from './src/theme/colors';
+import { MaterialCommunityIcons } from '@expo/vector-icons';
 
 const Stack = createNativeStackNavigator();
+const Tab = createBottomTabNavigator();
+
+const HomeStack = () => {
+  return (
+    <Stack.Navigator
+      screenOptions={{
+        headerStyle: {
+          backgroundColor: colors.primary,
+        },
+        headerTintColor: colors.accent,
+        headerTitleStyle: {
+          fontWeight: '600',
+        },
+      }}
+    >
+      <Stack.Screen 
+        name="MarketplaceBrowser" 
+        component={HomeScreen} 
+        options={{
+          title: 'Snowmobile Marketplace',
+        }}
+      />
+    </Stack.Navigator>
+  );
+};
 
 export default function App() {
   return (
     <NavigationContainer>
-      <Stack.Navigator
+      <Tab.Navigator
         screenOptions={{
-          headerStyle: {
+          tabBarActiveTintColor: colors.accent,
+          tabBarInactiveTintColor: colors.textLight,
+          tabBarStyle: {
             backgroundColor: colors.primary,
+            borderTopColor: colors.border,
+            height: 88,
+            paddingBottom: 32,
+            paddingTop: 8,
           },
-          headerTintColor: colors.accent,
-          headerTitleStyle: {
-            fontWeight: '600',
-          },
+          headerShown: false,
         }}
       >
-        <Stack.Screen 
-          name="Home" 
-          component={HomeScreen} 
+        <Tab.Screen 
+          name="Shop" 
+          component={HomeStack}
           options={{
-            title: 'Snowmobile Marketplace',
+            tabBarIcon: ({ color, size }) => (
+              <MaterialCommunityIcons name="storefront-outline" size={size} color={color} />
+            ),
           }}
         />
-      </Stack.Navigator>
+        <Tab.Screen 
+          name="Profile" 
+          component={ProfileScreen}
+          options={{
+            tabBarIcon: ({ color, size }) => (
+              <MaterialCommunityIcons name="account-outline" size={size} color={color} />
+            ),
+          }}
+        />
+      </Tab.Navigator>
     </NavigationContainer>
   );
 }