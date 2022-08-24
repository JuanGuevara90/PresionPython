#################################################################################
#################### Script para Machine Learning ###############################
#################################################################################
from sklearn.naive_bayes import GaussianNB
import pickle
import numpy as np

def modelClassification(msg,filename):
    loaded_model = pickle.load(open(filename, 'rb'))
    y_pred= loaded_model.predict([[msg]])
    print("clasificacion",y_pred[0])
    return y_pred