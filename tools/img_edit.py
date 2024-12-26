from PIL import Image
import os

input_folder = 'assets/raw/4'   # 待处理图片的文件夹
output_folder = 'assets/raw/4' # 输出裁剪后图片的文件夹
os.makedirs(output_folder, exist_ok=True)

for filename in os.listdir(input_folder):
    if filename.lower().endswith('.png'):
        file_path = os.path.join(input_folder, filename)
        img = Image.open(file_path)
        # 确保图像为 RGBA 模式，如果不是则转换
        if img.mode != 'RGBA':
            img = img.convert('RGBA')
        
        # 分离通道，取出Alpha通道
        r, g, b, a = img.split()
        
        # getbbox() 会返回非透明部分所包含的最小边界框 (left, upper, right, lower)
        bbox = a.getbbox()
        
        if bbox:
            # 对原图根据bbox进行裁剪
            cropped_img = img.crop(bbox)
            
            # 保存结果
            output_path = os.path.join(output_folder, filename)
            cropped_img.save(output_path, format='PNG')
            print(f"{filename} 裁剪完成并已保存至 {output_path}")
        else:
            # 没有非透明像素的情况就原样复制过去或跳过
            output_path = os.path.join(output_folder, filename)
            img.save(output_path, format='PNG')
            print(f"{filename} 没有非透明内容，已原样保存至 {output_path}")
