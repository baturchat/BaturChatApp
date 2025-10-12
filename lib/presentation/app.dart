
import 'package:batur_chat/presentation/screens/auth/auth_wrapper.dart';
import 'package:flutter/material.dart';

class BaturApp extends StatelessWidget {
  const BaturApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Batur Chat',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const AuthWrapper(),
    );
  }
}
