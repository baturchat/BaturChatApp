
import 'package:batur_chat/presentation/screens/auth/login_screen.dart';
import 'package:batur_chat/presentation/screens/home/home_screen.dart';
import 'package:batur_chat/state/blocs/auth_bloc.dart';
import 'package:batur_chat/state/providers/providers.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class AuthWrapper extends ConsumerWidget {
  const AuthWrapper({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authState = ref.watch(authBlocProvider);

    if (authState is Authenticated) {
      return const HomeScreen();
    } else {
      return const LoginScreen();
    }
  }
}
