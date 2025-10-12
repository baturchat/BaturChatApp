
import 'package:batur_chat/data/services/auth_service.dart';
import 'package:batur_chat/state/blocs/auth_bloc.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final authServiceProvider = Provider<AuthService>((ref) => AuthService());

final authBlocProvider = StateNotifierProvider<AuthBloc, AuthState>((ref) {
  final authService = ref.watch(authServiceProvider);
  return AuthBloc(authService);
});
