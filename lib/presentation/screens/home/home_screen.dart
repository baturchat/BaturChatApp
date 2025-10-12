
import 'package:batur_chat/state/blocs/auth_bloc.dart';
import 'package:batur_chat/state/providers/providers.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class HomeScreen extends ConsumerWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Home'),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () {
              ref.read(authBlocProvider.notifier).signOut();
            },
          ),
        ],
      ),
      body: const Center(
        child: Text('Welcome!'),
      ),
    );
  }
}
