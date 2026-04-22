(ns metabase.models.persisted-info-test
  (:require
   [clojure.test :refer :all]
   [metabase.models.persisted-info :as persisted-info]))

(deftest slug-name-test
  (testing "slug-name produces ASCII-only strings safe for use as SQL identifiers"
    (testing "basic ASCII names are unchanged (modulo truncation to 10 chars)"
      (is (= "my_model" (#'persisted-info/slug-name "my model"))))
    (testing "spaces are replaced with underscores"
      (is (= "foo_bar" (#'persisted-info/slug-name "foo bar"))))
    (testing "names are lowercased"
      (is (= "foobar" (#'persisted-info/slug-name "FooBar"))))
    (testing "result is truncated to 10 characters"
      (is (= "abcdefghij" (#'persisted-info/slug-name "abcdefghijklmnop"))))
    (testing "non-ASCII characters with ASCII decomposition are transliterated"
      ;; ş (s with cedilla) -> s, ö (o with diaeresis) -> o, etc.
      (is (= "is_emri_a" (#'persisted-info/slug-name "i̇ş emri a")))
      (is (= "cafe" (#'persisted-info/slug-name "café")))
      (is (= "resume" (#'persisted-info/slug-name "résumé"))))
    (testing "non-ASCII characters without ASCII decomposition are removed"
      ;; characters like Chinese/Japanese/Arabic that don't decompose to ASCII are dropped
      (is (= "model" (#'persisted-info/slug-name "model日本語"))))
    (testing "special characters that are not word characters are removed"
      (is (= "hello_worl" (#'persisted-info/slug-name "hello world!")))
      (is (= "hello" (#'persisted-info/slug-name "hello!")))))
)
