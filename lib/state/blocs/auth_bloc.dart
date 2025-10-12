
import 'dart:async';
import 'package:batur_chat/data/services/auth_service.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

abstract class AuthState {
  const AuthState();
}

class AuthInitial extends AuthState {
  const AuthInitial();
}

class Authenticated extends AuthState {
  final User user;
  const Authenticated(this.user);
}

class Unauthenticated extends AuthState {
  const Unauthenticated();
}

class AuthBloc extends StateNotifier<AuthState> {
  final AuthService _authService;
  StreamSubscription? _authSubscription;

  AuthBloc(this._authService) : super(const AuthInitial()) {
    _authSubscription = _authService.authStateChanges.listen((user) {
      if (user != null) {
        state = Authenticated(user);
      } else {
        state = const Unauthenticated();
      }
    });
  }

  Future<void> signIn(String email, String password) async {
    await _authService.signInWithEmailAndPassword(email, password);
  }

  Future<void> signUp(String email, String password) async {
    await _authService.createUserWithEmailAndPassword(email, password);
  }

  Future<void> signOut() async {
    await _authService.signOut();
  }

  @override
  void dispose() {
    _authSubscription?.cancel();
    super.dispose();
  }
}
