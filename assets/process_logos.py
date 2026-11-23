from PIL import Image
import numpy as np, os
folder=os.path.dirname(__file__)
for filename,bg,color in [('image2.png',(11,11,15),(255,255,255)),('image3.png',(255,255,255),(11,11,15))]:
 im=Image.open(os.path.join(folder,filename)).convert('RGBA')
 arr=np.asarray(im,dtype=float).copy()
 rgb=arr[:,:,:3]
 bgv=np.array(bg,dtype=float)
 is_mint = (rgb[:,:,1]>rgb[:,:,0]+18) & (rgb[:,:,1]>rgb[:,:,2]+4) & (rgb[:,:,1]>80)
 # alpha from distance to background, use dominant foreground channel
 if filename=='image2.png':
  alpha=np.max((rgb-bgv)/np.maximum(np.array([255,255,255])-bgv,1),axis=2)
 else:
  alpha=np.max((bgv-rgb)/np.maximum(bgv-np.array([11,11,15]),1),axis=2)
 alpha=np.clip(alpha,0,1)
 # For mint colored pixels use green channel ratio; match edge blending onto background
 if filename=='image2.png':
  alpha_mint=(rgb[:,:,1]-11)/(212-11)
 else:
  alpha_mint=(255-rgb[:,:,0])/(255-20)
 alpha=np.where(is_mint,np.clip(alpha_mint,0,1),alpha)
 # Remove extremely faint background noise
 alpha=np.where(alpha<0.016,0,alpha)
 out=np.zeros_like(arr,dtype=np.uint8)
 out[:,:,:3]=np.where(is_mint[:,:,None],np.array([45,212,191] if filename=='image2.png' else [20,184,166]),color).astype(np.uint8)
 out[:,:,3]=(alpha*255).astype(np.uint8)
 nonzero=np.argwhere(out[:,:,3]>2)
 y0,x0=nonzero.min(0); y1,x1=nonzero.max(0)+1
 outim=Image.fromarray(out[y0:y1,x0:x1],'RGBA')
 suffix='light' if filename=='image2.png' else 'dark'
 outim.save(os.path.join(folder,f'vantora-wordmark-{suffix}.png'))
 # V mark occupies left ~165px of input; measured from source layout
 mark=Image.fromarray(out[:,:205,:],'RGBA')
 pos=np.argwhere(np.array(mark)[:,:,3]>2); ya,xa=pos.min(0);yb,xb=pos.max(0)+1
 mark=mark.crop((xa,ya,xb,yb));mark.save(os.path.join(folder,f'vantora-mark-{suffix}.png'))
 print(filename,'crop', (x0,y0,x1,y1), 'wordmark',outim.size,'mark',mark.size)
