package com.smartmart.demo.Repository;


import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QuerySnapshot;
import com.smartmart.demo.Model.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.concurrent.ExecutionException;

@Repository
public class UserRepository {
    private final Firestore firestore;

    public UserRepository(Firestore firestore) {
        this.firestore = firestore;
    }

    public Optional<User> findByEmail(String email) throws ExecutionException, InterruptedException {
        Query query = firestore.collection("users").whereEqualTo("email", email);
        QuerySnapshot querySnapshot = query.get().get();

        if (querySnapshot.isEmpty()) {
            return Optional.empty();
        }

        User user = querySnapshot.getDocuments().get(0).toObject(User.class);
        user.setId(querySnapshot.getDocuments().get(0).getId());
        return Optional.of(user);
    }

    public void save(User user) throws ExecutionException, InterruptedException {
        String docId = firestore.collection("users").document().getId();
        user.setId(docId);
        firestore.collection("users").document(docId).set(user).get();
    }

    public Optional<User> findById(String userId) throws ExecutionException, InterruptedException {
        User user = firestore.collection("users").document(userId).get().get().toObject(User.class);
        if (user == null) {
            return Optional.empty();
        }
        user.setId(userId);
        return Optional.of(user);
    }
}
