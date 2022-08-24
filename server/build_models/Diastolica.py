################################################################################################ 
####################################### MODELO PRESION DIASTOLICA ########################################### 
################################################################################################


from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB
import numpy as np

import pickle
filename = 'model_d.sav'

n= 170
data_x = np.array([[0]])

data_y = np.array([1])

for i in range(1,n):
    if (i<=79):
        data_y = np.append(data_y,0)
    if (i>79 and i<=84):
        data_y = np.append(data_y,1)
    if (i>=85 and i<90):
        data_y = np.append(data_y,2)
    if (i>=90 ):
        data_y = np.append(data_y,3)
        
    data_x = np.append(data_x,[[i]],axis=0)
        

#print(data_x)
print(data_y)

''' 
data_x = np.arange(1)
print(data_x)
d = np.append(data_x,11)
print(np.array(d)) '''
#data_x =[[1],[2],[3],[4],[5],[6],[7],[8],[9],[10]]
#data_y = np.array([0,0,0,0,0,0,0,0,0,0])
''' 
ar=np.array([])
b=np.array(np.append(ar,[4]),ndmin=2)
b=np.array(np.append(b,[5]),ndmin=2)
print(b) '''



X_train, X_test, y_train, y_test = train_test_split(data_x, data_y, test_size=0.5, random_state=0)
#print(X_train)
#print(y_train)
gnb = GaussianNB()
model= gnb.fit(X_train, y_train)

#Save model
pickle.dump(model, open(filename, 'wb'))

# load the model from disk
loaded_model = pickle.load(open(filename, 'rb'))


y_pred= loaded_model.predict([[84]])
print(y_pred)
''' print("Number of mislabeled points out of a total %d points : %d" % (X_test.shape[0], (y_test != y_pred).sum())) '''