//
// Created by Yi Yang on 8/6/2022.
//


#include "com_pdmnotes_PdmCrypt.h"
#include <stdio.h>

#define STRING_RETURN "Hello world!"
#define STRING_CALLBACK "Hello world callback!"
#define STRING_CALLBACK_STATIC "Hello world static callback!"
#define STRING_PAYLOAD "Simple payload string"

JNIEXPORT jstring JNICALL Java_com_pdmnotes_PdmCrypt_getHash(JNIEnv *env,
                                          jobject thiz) {
    // get the class of an object
    jclass cls_foo = (*env)->GetObjectClass(env, thiz);
    // callback instance method with one String parameter
    // and void result
    jmethodID callback = (*env)->GetMethodID(env,
                                           cls_foo,
                                           "callback",
                                           "(Ljava/lang/String;)V");
    // callbackObject instance method with one
    // List<String> arrayList parameter and String result
    jmethodID callbackWithObject = (*env)->GetMethodID(env,
                             cls_foo,
                            "callbackObject",
                            "(Ljava/util/List;)Ljava/lang/String;");
    // callback static method with one String parameter
    // and void result
    jmethodID callbackStatic = (*env)->GetStaticMethodID(env,
                                           cls_foo,
                                           "callbackStatic",
                                           "(Ljava/lang/String;)V");
    // construct a new java.lang.String objects from
    // an array of characters in UTF-8 encoding
    jstring jStringRegular = (*env)->NewStringUTF(env,
                                           STRING_CALLBACK);

    jstring jStringStatic = (*env)->NewStringUTF(env,
                                           STRING_CALLBACK_STATIC);
    // call instance method with void result
    (*env)->CallVoidMethod(env, thiz, callback, jStringRegular);
    // call static instance method with void result
    (*env)->CallStaticVoidMethod(env,
                                 thiz,
                                 callbackStatic,
                                 jStringStatic);
    // delete the local references
    (*env)->DeleteLocalRef(env, jStringRegular);
    (*env)->DeleteLocalRef(env, jStringStatic);

    jclass cls = (*env)->FindClass(env, "java/util/ArrayList");
    // get the default constructor for java.util.ArrayList class
    jmethodID constructor = (*env)->GetMethodID(env,
                                                cls,
                                                "<init>",
                                                "()V");
    // create a new instance of java.util.ArrayList
    jobject arraylist = (*env)->NewObject(env, cls, constructor);

    jstring jStringPayload = (*env)->NewStringUTF(env,
                                                  STRING_PAYLOAD);
    // get the add method
    jmethodID addMethod = (*env)->GetMethodID(env,
                                           cls,
                                           "add",
                                           "(Ljava/lang/Object;)Z");
    // call the add method that returns boolean
    (*env)->CallBooleanMethod(env, arraylist,
                             addMethod, jStringPayload);
    // call the callbackObject method that returns String
    jobject resultString = (*env)->CallObjectMethod(env,
                                                 thiz,
                                                 callbackWithObject,
                                                 arraylist);
    // convert the jobject to an array of characters
    const char* str = (*env)->GetStringUTFChars(env,
                                             (jstring) resultString,
                                                NULL);
    // print returned string
    printf(str);
    (*env)->ReleaseStringUTFChars(env, resultString, str);
    (*env)->DeleteLocalRef(env, jStringPayload);
    (*env)->DeleteLocalRef(env, arraylist);

    return (*env)->NewStringUTF(env, STRING_RETURN);
}